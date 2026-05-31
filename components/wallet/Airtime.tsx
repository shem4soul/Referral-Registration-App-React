'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import mtn from "../../assets/images/MTN.svg";
import glo from "../../assets/images/Glo.svg";
import airtel from "../../assets/images/Airtel.svg";
import mobile from "../../assets/images/9mobile.svg";
import Image from "next/image";
import { usePurchase } from "@/apis/utility";
import { Spinner } from "../ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { PurchasePayload } from "@/types/type-props";
import TransferSuccessModal from "./TransferSuccessModal";
import { formatWithCommas } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Provider {
  id: number;
  name: string;
  logo: string;
  color: string;
}

interface AirtimePlan {
  amount: number;
  price: number;
}


interface FormErrors {
  provider?: string;
  phoneNumber?: string;
  amount?: string;
  pin?: string;
}

type TouchedFields = Record<keyof FormErrors, boolean>;

// ─── Constants ────────────────────────────────────────────────────────────────

const providers: Provider[] = [
  { id: 1, name: "MTN",     logo: mtn,    color: "bg-yellow-500" },
  { id: 2, name: "Airtel",  logo: airtel, color: "bg-red-500"    },
  { id: 3, name: "Glo",     logo: glo,    color: "bg-green-500"  },
  { id: 4, name: "9Mobile", logo: mobile, color: "bg-purple-500" },
];

const airtimePlans: AirtimePlan[] = [
  { amount: 100,  price: 100  },
  { amount: 200,  price: 200  },
  { amount: 500,  price: 500  },
  { amount: 1000, price: 1000 },
  { amount: 2000, price: 2000 },
  { amount: 5000, price: 5000 },
];


const MIN_AMOUNT        = 50;
const MAX_AMOUNT        = 50_000;
/** Matches 080…, 090…, 070…, 081…, etc. and their +234 equivalents */
const NIGERIAN_PHONE_RE = /^(0[7-9][0-1]\d{8}|234[7-9][0-1]\d{8})$/;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip whitespace, dashes and parentheses from a raw phone string */
function normalisePhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, "");
}

function validatePhone(raw: string): string | undefined {
  const phone = normalisePhone(raw);
  if (!phone)                          return "Phone number is required.";
  if (!NIGERIAN_PHONE_RE.test(phone))  return "Enter a valid Nigerian phone number (e.g. 08012345678).";
  return undefined;
}

function validateAmount(value: number | null): string | undefined {
  if (value === null || isNaN(value))  return "Please select or enter an amount.";
  if (value < MIN_AMOUNT)              return `Minimum airtime amount is ₦${MIN_AMOUNT}.`;
  if (value > MAX_AMOUNT)              return `Maximum airtime amount is ₦${MAX_AMOUNT.toLocaleString()}.`;
  return undefined;
}

function validatePin(pin: string): string | undefined {
  if (!pin)                      return "PIN is required.";
  if (!/^\d{4}$/.test(pin))   return "PIN must be 4 digits.";
  return undefined;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Airtime() {
  const router = useRouter();

  // ── Form state ───────────────────────────────────────────────────────────
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [phoneNumber,       setPhoneNumber]       = useState<string>("");
  const [selectedPlan,      setSelectedPlan]      = useState<number | null>(null);
  const [pin,               setPin]               = useState<string>("");
  const [errors,            setErrors]            = useState<FormErrors>({});
  const [touched,           setTouched]           = useState<TouchedFields>({
    provider: false, phoneNumber: false, amount: false, pin: false,
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);


  const { user } = useAuth();

  const {
    mutateAsync: purchaseUtility,
    isPending:   loading,
  } = usePurchase();

  // ── Cleanup polling on unmount ────────────────────────────────────────────
  // useEffect(() => {
  //   return () => {
  //     if (pollRef.current) clearInterval(pollRef.current);
  //   };
  // }, []);

  // ── Real-time field validation (runs whenever a field or touched flag changes)
  useEffect(() => {
    const next: FormErrors = {};

    if (touched.provider && !selectedProvider)
      next.provider = "Please select a network provider.";

    if (touched.phoneNumber) {
      const err = validatePhone(phoneNumber);
      if (err) next.phoneNumber = err;
    }

    if (touched.amount) {
      const err = validateAmount(selectedPlan);
      if (err) next.amount = err;
    }

    if (touched.pin) {
      const err = validatePin(pin);
      if (err) next.pin = err;
    }

    setErrors(next);
  }, [selectedProvider, phoneNumber, selectedPlan, pin, touched]);

  // ── Mark all fields touched + return whether the form is valid ────────────
  function validateAll(): boolean {
    const allTouched: TouchedFields = {
      provider: true, phoneNumber: true, amount: true, pin: true,
    };
    setTouched(allTouched);

    const errs: FormErrors = {};

    if (!selectedProvider)
      errs.provider = "Please select a network provider.";

    const phoneErr = validatePhone(phoneNumber);
    if (phoneErr) errs.phoneNumber = phoneErr;

    const amtErr = validateAmount(selectedPlan);
    if (amtErr) errs.amount = amtErr;

    const pinErr = validatePin(pin);
    if (pinErr) errs.pin = pinErr;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function markTouched(field: keyof FormErrors): void {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  
  // ── Derived values ────────────────────────────────────────────────────────

    const selectedProviderName =
    providers.find((p) => p.id.toString() === selectedProvider)?.name ?? "";

  const isFormComplete =
    !!selectedProvider &&
    !!phoneNumber &&
    selectedPlan !== null &&
    !!pin;

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handlePurchase(): Promise<void> {
    if (!validateAll()) return;

    const payload: PurchasePayload = {
      vertical:  "VTU",
      disco:     selectedProviderName.toUpperCase(),
      meter:     normalisePhone(phoneNumber),
      phone:     normalisePhone(phoneNumber),
      narration: "Purchase airtime",
      amount:    selectedPlan as number,
      vendType:  "PREPAID",
      name:`${user?.first_name} ${user?.last_name}`,
      orderId: "B7350586C74016B56677CE07389141CC",
      email: user?.email ?? "",
      paymentType: "B2B",
      pin,
    };

    await purchaseUtility(payload, {
      onSuccess: (res) => {
      //  toast.success(res?.data?.message || "✅ Airtime purchased successfully!");
      setIsSuccessModalOpen(true);
       setSelectedProvider("");
       setPhoneNumber("");
       setSelectedPlan(null);
       setPin("");
       setTouched({
        provider: false, phoneNumber: false, amount: false, pin: false,
      });
       setErrors({});
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message ||"There is an issue with your purchase. Please try again.");
        //  toast.error("There is an issue with your purchase. Please try again.");
      }
    });
  }

  // ── Poll for payment confirmation ─────────────────────────────────────────
  // function complete(transactionId: string): void {
  //   let callCount = 0;

  //   setCountdown(MAX_POLL_CALLS);
  //   setIsVerifying(true);

  //   // Cancel any lingering poll before starting a fresh one
  //   if (pollRef.current) clearInterval(pollRef.current);

  //   pollRef.current = setInterval(async () => {
  //     callCount++;
  //     setCountdown((prev) => Math.max(prev - 1, 0));

  //     if (callCount > MAX_POLL_CALLS) {
  //       clearInterval(pollRef.current!);
  //       pollRef.current = null;
  //       setIsVerifying(false);
  //       return;
  //     }

  //     await verifyPayment(transactionId, {
  //       onSuccess: (data: VerifyPaymentResponse) => {
  //         if (data?.status) {
  //           clearInterval(pollRef.current!);
  //           pollRef.current = null;
  //           setIsVerifying(false);
  //           setModalOpen(false);
  //         } else if (callCount >= MAX_POLL_CALLS) {
  //           clearInterval(pollRef.current!);
  //           pollRef.current = null;
  //           setIsVerifying(false);
  //         }
  //       },
  //     });
  //   }, POLL_INTERVAL_MS);
  // }

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Go back"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Buy Airtime</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Step 1: Select Provider ──────────────────────────────────────── */}
        <Card className="bg-white mb-8">
          <div className="p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Select Provider
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => {
                    setSelectedProvider(provider.id.toString());
                    markTouched("provider");
                  }}
                  className={`p-6 rounded-xl border-2 transition flex flex-col items-center justify-center gap-3 ${
                    selectedProvider === provider.id.toString()
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                  aria-pressed={selectedProvider === provider.id.toString()}
                >
                  <Image
                    src={provider.logo}
                    alt={provider.name}
                    width={40}
                    height={40}
                  />
                  <p className="font-semibold text-gray-900">{provider.name}</p>
                </button>
              ))}
            </div>

            {touched.provider && errors.provider && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {errors.provider}
              </p>
            )}
          </div>
        </Card>

        {/* ── Steps 2–5: reveal once a provider is chosen ─────────────────── */}
        {selectedProvider && (
          <Card className="bg-white mb-8">
            <div className="p-8 space-y-6">

              {/* Phone Number */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Phone Number
                </h2>
                <Input
                  id="phone-number"
                  type="tel"
                  placeholder="e.g. 08012345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => markTouched("phoneNumber")}
                  maxLength={14}
                  inputMode="tel"
                  autoComplete="tel"
                  className={`h-12 ${
                    touched.phoneNumber && errors.phoneNumber
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                  aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Quick-select Amount */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Select Amount
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {airtimePlans.map((plan) => (
                    <button
                      key={plan.amount}
                      onClick={() => {
                        setSelectedPlan(plan.amount);
                        markTouched("amount");
                      }}
                      className={`p-4 rounded-lg border-2 transition font-semibold ${
                        selectedPlan === plan.amount
                          ? "border-blue-500 bg-blue-50 text-blue-900"
                          : "border-gray-200 hover:border-blue-300 bg-white text-gray-900"
                      }`}
                      aria-pressed={selectedPlan === plan.amount}
                    >
                      ₦{formatWithCommas(plan.amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual / custom Amount */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Or Enter Amount&nbsp;
                  <span className="text-sm font-normal text-gray-500">
                    (₦{MIN_AMOUNT} – ₦{MAX_AMOUNT.toLocaleString()})
                  </span>
                </h3>
                <Input
                  id="manual-amount"
                  type="number"
                  placeholder="Enter custom amount"
                  value={
                  selectedPlan !== null ? `₦${formatWithCommas(selectedPlan)}` : ""
                }
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  onChange={(e) => {
                    const raw = e.target.value;
                      const digits = raw.replace(/[^\d]/g, "");
                  if (digits === "") {
                    setSelectedPlan(null);
                  } else {
                    const numericValue = Number(digits);
                    setSelectedPlan(numericValue);
                  }
                    markTouched("amount");
                  }}
                  onBlur={() => markTouched("amount")}
                  inputMode="numeric"
                  className={`h-12 ${
                    touched.amount && errors.amount
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                  aria-describedby={errors.amount ? "amount-error" : undefined}
                />
                {touched.amount && errors.amount && (
                  <p id="amount-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* PIN */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">PIN</h3>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter your PIN"
                  value={pin}
                  onChange={(e) => {
                    // Digits only, max 6 characters
                    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setPin(cleaned);
                    markTouched("pin");
                  }}
                  onBlur={() => markTouched("pin")}
                  inputMode="numeric"
                  maxLength={4}
                  autoComplete="current-password"
                  className={`h-12 ${
                    touched.pin && errors.pin
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                  aria-describedby={errors.pin ? "pin-error" : undefined}
                />
                {touched.pin && errors.pin && (
                  <p id="pin-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.pin}
                  </p>
                )}
              </div>

              {/* Summary Card – only shown when there is valid data to display */}
              {selectedPlan !== null && !errors.amount && (
                <Card className="bg-blue-50 border-blue-200 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-600">Provider</p>
                      <p className="font-bold text-blue-900">{selectedProviderName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Amount</p>
                      <p className="font-bold text-blue-900">
                        ₦{selectedPlan.toLocaleString()}
                      </p>
                    </div>
                    {phoneNumber && !errors.phoneNumber && (
                      <div className="col-span-2">
                        <p className="text-sm text-blue-600">Phone Number</p>
                        <p className="font-bold text-blue-900">
                          {normalisePhone(phoneNumber)}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Submit */}
              <div className="pt-2">
                <Button
                  onClick={handlePurchase}
                  disabled={!isFormComplete || loading}
                  className="w-full rounded-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner className="size-5 animate-spin" />
                      Please wait…
                    </span>
                  ) : (
                    "Buy Airtime"
                  )}
                </Button>
              </div>

            </div>
          </Card>
        )}
      </main>

      <TransferSuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} data={{type:'airtime',recipient:phoneNumber,amount:Number(selectedPlan)}} />
    </div>
  );
}