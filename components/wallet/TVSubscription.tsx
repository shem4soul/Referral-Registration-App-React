"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import dsTv from "../../assets/images/dsTv.jpeg";
import startimes from "../../assets/images/startimes.jpeg";
import goTv from "../../assets/images/goTv.jpeg";
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
import TransferSuccessModal from "./TransferSuccessModal";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TVPlan {
  code: string;
  desc: string;
  price: number;
}

interface PurchasePayload {
  orderId: string; // plan.code
  meter: string; // smart card number (TV number)
  disco: string; // provider name (DSTV, GOTV, STARTIMES)
  phone: string; // user's phone (optional)
  paymentType: string;
  vendType: string;
  vertical: string; // "tv"
  email: string;
  name: string;
  amount: number; // plan.price
  pin: string;
}

interface FormErrors {
  provider?: string;
  tvNumber?: string;
  plan?: string;
  pin?: string;
}

type TouchedFields = Record<keyof FormErrors, boolean>;

// ─── Constants ────────────────────────────────────────────────────────────────

const PROVIDERS = [
  { id: "gotv", name: "GOTV", logo: goTv.src, minDigits: 10 },
  { id: "dstv", name: "DSTV", logo: dsTv.src, minDigits: 10 },
  { id: "startimes", name: "STARTIMES", logo: startimes.src, minDigits: 11 }, // adjust as needed
];

const PIN_LENGTH = 4;

// ─── Validation Helpers ──────────────────────────────────────────────────────

function validateTVNumber(
  value: string,
  minDigits: number,
): string | undefined {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "TV number is required.";
  if (digits.length !== minDigits)
    return `TV number must be ${minDigits} digits.`;
  return undefined;
}

function validatePin(pin: string): string | undefined {
  if (!pin) return "PIN is required.";
  if (!/^\d{4}$/.test(pin)) return "PIN must be 4 digits.";
  return undefined;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TVSubscription() {
  const router = useRouter();
  const { user } = useAuth();

  // ── Form state ─────────────────────────────────────────────────────────────
  const [selectedProvider, setSelectedProvider] = useState<string>("gotv");
  const [tvNumber, setTvNumber] = useState<string>("");
  const [selectedPlanCode, setSelectedPlanCode] = useState<string | null>(null);
  const [pin, setPin] = useState<string>("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    provider: false,
    tvNumber: false,
    plan: false,
    pin: false,
  });

  // ── API hooks ──────────────────────────────────────────────────────────────
  const {
    mutateAsync: getPlans,
    data: plansData,
    isPending: loadingPlans,
  } = useGetPlan();

  const { mutateAsync: purchaseUtility, isPending: purchasing } = usePurchase();

  // ── Derived values ─────────────────────────────────────────────────────────
  const plans = plansData || []; // adjust if your hook returns { data: [...] }
  const selectedPlan = plans.find((p: TVPlan) => p.code === selectedPlanCode);
  const currentProvider = PROVIDERS.find((p) => p.id === selectedProvider);
  const minDigits = currentProvider?.minDigits || 10;

  const isFormComplete =
    !!selectedProvider &&
    tvNumber.replace(/\D/g, "").length === minDigits &&
    !!selectedPlanCode &&
    pin.replace(/\D/g, "").length === PIN_LENGTH;

  // ── Real-time validation ───────────────────────────────────────────────────
  useEffect(() => {
    const next: FormErrors = {};

    if (touched.provider && !selectedProvider) {
      next.provider = "Please select a TV provider.";
    }

    if (touched.tvNumber) {
      const err = validateTVNumber(tvNumber, minDigits);
      if (err) next.tvNumber = err;
    }

    if (touched.plan && !selectedPlanCode) {
      next.plan = "Please select a subscription plan.";
    }

    if (touched.pin) {
      const err = validatePin(pin);
      if (err) next.pin = err;
    }

    setErrors(next);
  }, [selectedProvider, tvNumber, selectedPlanCode, pin, touched, minDigits]);

  // ── Reset plan when provider changes ───────────────────────────────────────
  useEffect(() => {
    setSelectedPlanCode(null);
  }, [selectedProvider]);

  // ── Fetch plans when provider is selected ──────────────────────────────────
  useEffect(() => {
    if (selectedProvider) {
      getPlans({ vertical: "tv", provider: selectedProvider.toUpperCase() });
    }
  }, [selectedProvider, getPlans]);

  // ── Mark touched handlers ──────────────────────────────────────────────────
  const markTouched = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateAll = (): boolean => {
    const allTouched: TouchedFields = {
      provider: true,
      tvNumber: true,
      plan: true,
      pin: true,
    };
    setTouched(allTouched);

    const errs: FormErrors = {};

    if (!selectedProvider) errs.provider = "Please select a TV provider.";

    const tvErr = validateTVNumber(tvNumber, minDigits);
    if (tvErr) errs.tvNumber = tvErr;

    if (!selectedPlanCode) errs.plan = "Please select a subscription plan.";

    const pinErr = validatePin(pin);
    if (pinErr) errs.pin = pinErr;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Purchase handler ───────────────────────────────────────────────────────
  const handlePurchase = async () => {
    if (!validateAll()) return;
    if (!selectedPlan) return;

    const payload: PurchasePayload = {
      orderId: selectedPlan.code,
      meter: tvNumber.replace(/\D/g, ""),
      disco: currentProvider!.name.toUpperCase(),
      phone: user?.phone_number
        ? `0${user.phone_number}`
        : "",
      paymentType: "B2B",
      vendType: "PREPAID",
      vertical: "tv",
      email: user?.email ?? "",
      name: user ? `${user.first_name} ${user.last_name}` : "",
      amount: selectedPlan.price,
      pin: pin.replace(/\D/g, ""),
    };

    await purchaseUtility(payload, {
      onSuccess: () => {
        setIsSuccessModalOpen(true);
        // Reset form
        setSelectedProvider("");
        setTvNumber("");
        setSelectedPlanCode(null);
        setPin("");
        setTouched({
          provider: false,
          tvNumber: false,
          plan: false,
          pin: false,
        });
        setErrors({});
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ||
            "There was an issue with your purchase. Please try again.",
        );
      },
    });
  };

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Buy TV Subscription
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white">
          <div className="p-8 space-y-6">
            {/* Provider Tabs */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Select Provider
              </h2>
              <Tabs
                value={selectedProvider}
                onValueChange={(value) => {
                  setSelectedProvider(value);
                  markTouched("provider");
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 h-22">
                  {PROVIDERS.map((provider) => (
                    <TabsTrigger
                      key={provider.id}
                      value={provider.id}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <Image
                        src={provider.logo}
                        alt={provider.name}
                        width={40}
                        height={40}
                        className="rounded-sm"
                      />
                      <span className="hidden sm:inline">{provider.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                {/* Empty TabsContent just to satisfy Tabs structure */}
                {PROVIDERS.map((provider) => (
                  <TabsContent key={provider.id} value={provider.id} />
                ))}
              </Tabs>
              {touched.provider && errors.provider && (
                <p className="mt-2 text-sm text-red-600">{errors.provider}</p>
              )}
            </div>

            {/* TV Number (Smart Card) */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Smart Card Number
              </label>
              <Input
                type="text"
                placeholder={`Enter ${minDigits}-digit smart card number`}
                value={tvNumber}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "");
                  setTvNumber(digits);
                  markTouched("tvNumber");
                }}
                onBlur={() => markTouched("tvNumber")}
                maxLength={minDigits}
                className={cn(
                  "h-12 border-gray-300",
                  touched.tvNumber && errors.tvNumber ? "border-red-500" : "",
                )}
              />
              {touched.tvNumber && errors.tvNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.tvNumber}</p>
              )}
            </div>

            {/* Plan Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Select Subscription Plan
              </h3>

                 <Select
                    value={selectedPlanCode ?? undefined}
                    onValueChange={(value) => {
                      setSelectedPlanCode(value);
                      markTouched("plan");
                    }}
                    disabled={loadingPlans}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-12 border-gray-300 w-full",
                        touched.plan && errors.plan ? "border-red-500" : "",
                      )}
                    >
                      {loadingPlans ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                          <span className="ml-2 text-xs text-gray-600">
                            Loading plans...
                          </span>
                        </div>
                      ) : (
                        <SelectValue placeholder="Choose a plan" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {!loadingPlans && plans.length > 0 ? (
                        plans.map((plan: TVPlan) => (
                          <SelectItem className="flex items-center justify-between w-full gap-4" key={plan.code} value={plan.code}>
                              <p className="text-gray-600 font-medium">{plan.desc}</p>
                              <p className="bg-gray-100 p-0.5 rounded font-semibold whitespace-nowrap">
                                ₦{plan.price.toLocaleString()}
                              </p>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="min-h-40 flex items-center justify-center">
                          <p className="text-gray-400">
                            No plans available for this provider.
                          </p>
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  {touched.plan && errors.plan && (
                    <p className="mt-1 text-sm text-red-600">{errors.plan}</p>
                  )}
            </div>

            {/* PIN */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">PIN</h3>
              <Input
                type="password"
                placeholder="Enter your 4-digit PIN"
                value={pin}
                onChange={(e) => {
                  const digits = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, PIN_LENGTH);
                  setPin(digits);
                  markTouched("pin");
                }}
                onBlur={() => markTouched("pin")}
                maxLength={PIN_LENGTH}
                className={cn(
                  "h-12 border-gray-300",
                  touched.pin && errors.pin ? "border-red-500" : "",
                )}
              />
              {touched.pin && errors.pin && (
                <p className="mt-1 text-sm text-red-600">{errors.pin}</p>
              )}
            </div>

            {/* Summary Card */}
            {selectedPlan && (
              <Card className="bg-blue-50 border-blue-200 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-600">Provider</p>
                    <p className="font-bold text-blue-900">
                      {currentProvider?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">Plan</p>
                    <p className="font-bold text-blue-900">
                      {selectedPlan.desc}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">Amount</p>
                    <p className="font-bold text-blue-900">
                      ₦{selectedPlan.price.toLocaleString()}
                    </p>
                  </div>
                  {tvNumber && !errors.tvNumber && (
                    <div>
                      <p className="text-sm text-blue-600">Smart Card</p>
                      <p className="font-bold text-blue-900">{tvNumber}</p>
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
                  "Buy Subscription"
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Success Modal */}
        <TransferSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          data={{
            type: "tv",
            recipient: currentProvider?.name || "the provider",
            amount: selectedPlan?.price ?? 0,
          }}
        />
      </main>
    </div>
  );
}
