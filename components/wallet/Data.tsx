'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import mtn from "../../assets/images/MTN.svg";
import glo from "../../assets/images/Glo.svg";
import airtel from "../../assets/images/Airtel.svg";
import mobile from "../../assets/images/9mobile.svg";
import Image from "next/image";
import { useGetPlan, usePurchase } from "@/apis/utility";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { Spinner } from "../ui/spinner";
import { PurchasePayload } from "@/types/type-props";
import TransferSuccessModal from "./TransferSuccessModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Provider {
  id: number;
  name: string;
  logo: string;
  color: string;
}

interface DataPlan {
  code: string;
  desc: string;
  price: number;
  validity: string;
}

// interface PurchasePayload {
//   tariffClass: string;    // plan.code
//   meter: string;          // normalized phone
//   disco: string;          // provider name
//   phone: string;          // normalized phone
//   paymentType: string;    // "B2B"
//   vendType: string;       // "PREPAID"
//   vertical: string;       // "DATA"
//   email: string;
//   name: string;
//   amount: number;         // plan.price
//   pin: string;
// }

interface FormErrors {
  provider?: string;
  phoneNumber?: string;
  plan?: string;
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

const NIGERIAN_PHONE_RE = /^(0[7-9][0-1]\d{8}|234[7-9][0-1]\d{8})$/;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalisePhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, "");
}

function validatePhone(raw: string): string | undefined {
  const phone = normalisePhone(raw);
  if (!phone) return "Phone number is required.";
  if (!NIGERIAN_PHONE_RE.test(phone)) return "Enter a valid Nigerian phone number (e.g. 08012345678).";
  return undefined;
}

function validatePin(pin: string): string | undefined {
  if (!pin) return "PIN is required.";
  if (!/^\d{4}$/.test(pin)) return "PIN must be 4 digits.";
  return undefined;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Data() {
  const router = useRouter();
  const { user } = useAuth();

  // ── Form state ─────────────────────────────────────────────────────────────
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedPlanCode, setSelectedPlanCode] = useState<string | null>(null);
  const [pin, setPin] = useState<string>("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    provider: false,
    phoneNumber: false,
    plan: false,
    pin: false,
  });

  // ── API hooks ──────────────────────────────────────────────────────────────
  const {
    mutateAsync: getDataPlans,
    data: dataPlan,
    isPending: loadingPlans,
  } = useGetPlan();

  const {
    mutateAsync: purchaseUtility,
    isPending: purchasing,
  } = usePurchase();

  // ── Derived values ─────────────────────────────────────────────────────────
  const selectedPlan = dataPlan?.find((p: DataPlan) => p.code === selectedPlanCode);
  const selectedProviderName =
    providers.find((p) => p.id.toString() === selectedProvider)?.name ?? "";

  const isFormComplete =
    !!selectedProvider &&
    !!phoneNumber &&
    !!selectedPlanCode &&
    !!pin;

  // ── Real-time validation (runs whenever a field or touched flag changes) ──
  useEffect(() => {
    const next: FormErrors = {};

    if (touched.provider && !selectedProvider) {
      next.provider = "Please select a network provider.";
    }

    if (touched.phoneNumber) {
      const err = validatePhone(phoneNumber);
      if (err) next.phoneNumber = err;
    }

    if (touched.plan && !selectedPlanCode) {
      next.plan = "Please select a data plan.";
    }

    if (touched.pin) {
      const err = validatePin(pin);
      if (err) next.pin = err;
    }

    setErrors(next);
  }, [selectedProvider, phoneNumber, selectedPlanCode, pin, touched]);

  // ── Mark field as touched ──────────────────────────────────────────────────
  const markTouched = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // ── Validate all fields (for submit) ───────────────────────────────────────
  const validateAll = (): boolean => {
    const allTouched: TouchedFields = {
      provider: true,
      phoneNumber: true,
      plan: true,
      pin: true,
    };
    setTouched(allTouched);

    const errs: FormErrors = {};

    if (!selectedProvider) errs.provider = "Please select a network provider.";

    const phoneErr = validatePhone(phoneNumber);
    if (phoneErr) errs.phoneNumber = phoneErr;

    if (!selectedPlanCode) errs.plan = "Please select a data plan.";

    const pinErr = validatePin(pin);
    if (pinErr) errs.pin = pinErr;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Handle provider selection ──────────────────────────────────────────────
  const handleSelectProvider = async (provider: Provider) => {
    setSelectedProvider(provider.id.toString());
    markTouched("provider");
    await getDataPlans({ vertical: "DATA", provider: provider.name.toLowerCase() });
    // Reset plan selection when provider changes
    setSelectedPlanCode(null);
  };

  // ── Purchase submission ────────────────────────────────────────────────────
  const handlePurchase = async () => {
    if (!validateAll()) return;
    if (!selectedPlan) return;

    const payload: PurchasePayload = {
      tariffClass: selectedPlan.code,
      meter: normalisePhone(phoneNumber),
      disco: selectedProviderName.toUpperCase(),
      phone: normalisePhone(phoneNumber),
      paymentType: "B2B",
      vendType: "PREPAID",
      vertical: "DATA",
      email: user?.email ?? "",
      name: user ? `${user.first_name} ${user.last_name}` : "",
      amount: selectedPlan.price,
      pin,
    };

    await purchaseUtility(payload, {
      onSuccess: (res) => {
        // toast.success(res?.data?.message || "✅ Data purchased successfully!");
        setIsSuccessModalOpen(true);
        setSelectedProvider("");
        setPhoneNumber("");
        setSelectedPlanCode(null);
        setPin("");
        setTouched({
          provider: false,
          phoneNumber: false,
          plan: false,
          pin: false,
        });
        setErrors({});
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "There is an issue with your purchase. Please try again.");
        // toast.error("There is an issue with your purchase. Please try again.");
      },
    });
  };

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-50"> */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Buy Data</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Select Provider */}
        <Card className="bg-white mb-8">
          <div className="p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Select Provider</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleSelectProvider(provider)}
                  className={`p-6 rounded-xl border-2 transition flex flex-col items-center justify-center gap-3 ${
                    selectedProvider === provider.id.toString()
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <Image src={provider.logo} alt={provider.name} width={40} height={40} />
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

        {/* Phone Number & Plans */}
        {selectedProvider && (
          <Card className="bg-white mb-8">
            <div className="p-8 space-y-6">
              {/* Phone Number */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Phone Number</h2>
                <Input
                  type="tel"
                  placeholder="e.g. 08012345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => markTouched("phoneNumber")}
                  maxLength={14}
                  className={`h-12 ${
                    touched.phoneNumber && errors.phoneNumber
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Data Plan Select */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Data Plan</h3>

                {loadingPlans && (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading plans...</span>
                  </div>
                )}

                {!loadingPlans && dataPlan && Array.isArray(dataPlan) && (
                  <>
                    <Select
                      value={selectedPlanCode ?? undefined}
                      onValueChange={(value) => {
                        setSelectedPlanCode(value);
                        markTouched("plan");
                      }}
                    >
                      <SelectTrigger
                        className={`h-12 border-gray-300 w-full ${
                          touched.plan && errors.plan
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      >
                        <SelectValue placeholder="Choose a data plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataPlan.map((plan: DataPlan) => (
                          <SelectItem key={plan.code} value={plan.code}>
                            <div className="flex items-center justify-between w-full gap-4">
                              <span className="text-gray-600 font-medium md:hidden">
                                {plan.desc.length > 20 ? plan.desc.substring(0, 25) + "..." : plan.desc}
                              </span>
                              <span className="text-gray-600 font-medium hidden md:block">
                                {plan.desc.length > 50 ? plan.desc.substring(0, 50) + "..." : plan.desc}
                              </span>
                              <span className="bg-gray-100 p-0.5 rounded font-semibold whitespace-nowrap">
                                 ₦{plan.price.toLocaleString()}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {touched.plan && errors.plan && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.plan}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* PIN */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">PIN</h3>
                <Input
                  type="password"
                  placeholder="Enter your PIN"
                  value={pin}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setPin(cleaned);
                    markTouched("pin");
                  }}
                  onBlur={() => markTouched("pin")}
                  maxLength={4}
                  className={`h-12 ${
                    touched.pin && errors.pin
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                />
                {touched.pin && errors.pin && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.pin}
                  </p>
                )}
              </div>

              {/* Summary */}
              {selectedPlan && !errors.plan && (
                <Card className="bg-blue-50 border-blue-200 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-600">Provider</p>
                      <p className="font-bold text-blue-900">{selectedProviderName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Amount</p>
                      <p className="font-bold text-blue-900">₦{selectedPlan.price}</p>
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

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  onClick={handlePurchase}
                  disabled={!isFormComplete || purchasing}
                  className="w-full rounded-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                >
                  {purchasing ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner className="size-5 animate-spin" />
                      Processing…
                    </span>
                  ) : (
                    "Buy Data"
                  )}
                </Button>
              </div>
            </div>
          </Card>
        )}

         <TransferSuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} data={{type:'data',recipient:phoneNumber,amount:Number(selectedPlan)}} />
      </main>
    </div>
  );
}