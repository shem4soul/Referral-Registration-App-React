"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  useGetBranches,
  usePurchase,
  useVerifyMeterNumber,
} from "@/apis/utility";
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
import { cn, formatWithCommas } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MeterVerificationSuccess {
  error: false;
  discoCode: string;
  vendType: string;
  meterNo: string;
  minVendAmount: number;
  maxVendAmount: number;
  responseCode: number;
  outstanding: number;
  debtRepayment: number;
  name: string;
  address: string;
  tariff: number;
  tariffDesc: string;
  tariffClass: string;
  orderId: string;
  demandCategory: string;
}

interface VerificationError {
  status: false;
  message: string;
  data: null;
}

export type MeterVerificationResponse =
  | MeterVerificationSuccess
  | VerificationError;

export interface MeterVerificationPayload {
  meter: string | number;
  vendType: string;
  disco: string;
  vertical: string;
}

interface branch {
  id: number;
  name: string;
}

interface ElectricityPurchasePayload {
  orderId: string;
  meter: string;
  disco: string;
  phone: string;
  paymentType: string;
  vendType: string;
  vertical: string;
  email: string;
  name: string;
  amount: number;
  pin: string;            // Added PIN
}

interface FormErrors {
  amount?: string;
  meter_number?: string;
  branch?: string;
  pin?: string;           // Added PIN error
}

type TouchedFields = Record<keyof FormErrors, boolean>;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const MIN_AMOUNT = 350;
const MAX_AMOUNT = 10000000;
const PIN_LENGTH = 4;

function validateMeterNumber(raw: string): string | undefined {
  const meterNumber = raw.replace(/\D/g, "");
  if (!meterNumber) return "Meter number is required.";
  if (meterNumber.length !== 13) return "Meter number must be 13 digits.";
  return undefined;
}

function validateAmount(value: number | null): string | undefined {
  if (value === null || isNaN(value)) return "Please enter an amount.";
  if (value < MIN_AMOUNT) return `Minimum bill amount is ₦${MIN_AMOUNT}.`;
  if (value > MAX_AMOUNT)
    return `Maximum bill amount is ₦${MAX_AMOUNT.toLocaleString()}.`;
  return undefined;
}

function validatePin(pin: string): string | undefined {
  if (!pin) return "PIN is required.";
  if (!/^\d{4}$/.test(pin)) return "PIN must be 4 digits.";
  return undefined;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Electricity() {
  const router = useRouter();
  const { user } = useAuth();

  // ── Form state ─────────────────────────────────────────────────────────────
  const [meter_number, setMeter_number] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [pin, setPin] = useState<string>("");            // New PIN state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [responseAmount, setResponseAmount] = useState<number | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    amount: false,
    meter_number: false,
    branch: false,
    pin: false,
  });

  // ── Verification state ─────────────────────────────────────────────────────
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [verificationResponse, setVerificationResponse] =
    useState<MeterVerificationSuccess | null>(null);
  const [verificationError, setVerificationError] = useState("");

  // ── API hooks ──────────────────────────────────────────────────────────────
  const { data: branches, isLoading: loadingBranches } = useGetBranches();
  const { mutateAsync: verifyMeterNumber, isPending: verifying } =
    useVerifyMeterNumber();
  const { mutateAsync: purchaseUtility, isPending: purchasing } = usePurchase();

  const isFormComplete =
    !!selectedBranch &&
    meter_number.replace(/\D/g, "").length === 13 &&
    !!amount &&
    pin.replace(/\D/g, "").length === PIN_LENGTH;

  // ── Real-time validation ───────────────────────────────────────────────────
  useEffect(() => {
    const next: FormErrors = {};

    if (touched.branch && !selectedBranch) {
      next.branch = "Please select a branch.";
    }

    if (touched.meter_number) {
      const err = validateMeterNumber(meter_number);
      if (err) next.meter_number = err;
    }

    if (touched.amount) {
      const err = validateAmount(amount);
      if (err) next.amount = err;
    }

    if (touched.pin) {
      const err = validatePin(pin);
      if (err) next.pin = err;
    }

    setErrors(next);
  }, [meter_number, amount, selectedBranch, pin, touched]);

  // Trigger verification when meter number reaches 13 digits and branch is selected
  useEffect(() => {
    const normalized = meter_number.replace(/\D/g, "");
    if (
      normalized.length === 13 &&
      selectedBranch &&
      verificationStatus !== "loading"
    ) {
      handleVerifyMeterNumber();
    } else if (normalized.length !== 13) {
      setVerificationStatus("idle");
      setVerificationResponse(null);
      setVerificationError("");
    }
  }, [meter_number, selectedBranch]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const markTouched = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateAll = (): boolean => {
    const allTouched: TouchedFields = {
      amount: true,
      meter_number: true,
      branch: true,
      pin: true,
    };
    setTouched(allTouched);

    const errs: FormErrors = {};

    const meterNumberErr = validateMeterNumber(meter_number);
    if (meterNumberErr) errs.meter_number = meterNumberErr;

    const amtErr = validateAmount(amount);
    if (amtErr) errs.amount = amtErr;

    if (!selectedBranch) errs.branch = "Please select a branch.";

    const pinErr = validatePin(pin);
    if (pinErr) errs.pin = pinErr;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleVerifyMeterNumber = async () => {
    if (!selectedBranch) return;
    const digits = meter_number.replace(/\D/g, "");
    if (digits.length !== 13) return;

    setVerificationStatus("loading");
    setVerificationError("");
    setVerificationResponse(null);

    try {
      const response = (await verifyMeterNumber({
        meter: digits,
        vendType: "PREPAID",
        disco: selectedBranch.toUpperCase(),
        vertical: "ELECTRICITY",
      })) as MeterVerificationResponse;

      if ("name" in response && response.name) {
        setVerificationResponse(response);
        setVerificationStatus("success");
        setVerificationError("");
      } else {
        setVerificationStatus("error");
        setVerificationError("Meter verification failed.");
      }
    } catch (error) {
      setVerificationStatus("error");
      setVerificationError(
        error?.response?.data?.message ||
          "Unable to verify meter. Please try again.",
      );
    }
  };

  const handlePurchase = async () => {
    if (!validateAll()) return;
    if (!selectedBranch) return;

    const payload: ElectricityPurchasePayload = {
      orderId: verificationResponse?.orderId || "", // "2321"
      meter: meter_number.replace(/\D/g, ""),
      disco: selectedBranch.toUpperCase(),
      // phone: user ? `${user.country_code}${user.phone_number}` : "",
      phone: user ? `0${user.phone_number}` : "",
      paymentType: "B2B",
      vendType: "PREPAID",
      vertical: "ELECTRICITY",
      email: user?.email ?? "",
      name: user ? `${user.first_name} ${user.last_name}` : "",
      amount: amount!,
      pin: pin.replace(/\D/g, ""),
    };

    await purchaseUtility(payload, {
      onSuccess: (response) => {
          const { token } = response.data;
          setToken(token);
        setIsSuccessModalOpen(true);
        // Reset form
        setMeter_number("");
        setSelectedBranch(null);
        setResponseAmount(amount);
        setAmount(null);
        setPin("");
        setTouched({
          amount: false,
          meter_number: false,
          branch: false,
          pin: false,
        });
        setErrors({});
        setVerificationStatus("idle");
        setVerificationResponse(null);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ||
            "There is an issue with your purchase. Please try again.",
        );
      },
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────────

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
          <h1 className="text-2xl font-bold text-gray-900">Buy Electricity</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white mb-8">
          <div className="p-8 space-y-6">
            {/* Branch Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Select Branch
              </h3>

              <Select
                value={selectedBranch ?? undefined}
                onValueChange={(value) => {
                  setSelectedBranch(value);
                  markTouched("branch");
                }}
                disabled={loadingBranches}
              >
                <SelectTrigger
                  className={`h-12 border-gray-300 w-full ${
                    touched.branch && errors.branch
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                >
                  {loadingBranches ? (
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="ml-2 text-xs text-gray-600">
                        Loading branches...
                      </span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Choose a branch" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {!loadingBranches && branches?.length > 0 ? (
                    branches.map((branch: branch) => (
                      <SelectItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="min-h-40 flex items-center justify-center">
                      <p className="text-gray-400">There is no branch yet</p>
                    </div>
                  )}
                </SelectContent>
              </Select>
              {touched.branch && errors.branch && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.branch}
                </p>
              )}
            </div>

            {/* Meter Number */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Meter Number
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter 13-digit meter number"
                  value={meter_number}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    setMeter_number(digits);
                    markTouched("meter_number");
                  }}
                  onBlur={() => markTouched("meter_number")}
                  maxLength={13}
                  className={cn(
                    "h-12 border-gray-300 pr-10",
                    touched.meter_number && errors.meter_number
                      ? "border-red-500"
                      : "",
                  )}
                />
                {verifying && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-blue-600" />
                )}
              </div>
              {touched.meter_number && errors.meter_number && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.meter_number}
                </p>
              )}

              {verificationStatus === "success" &&
                verificationResponse.name && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      {verificationResponse.name}
                    </p>
                  </div>
                )}
              {verificationStatus === "error" && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">{verificationError}</p>
                </div>
              )}
            </div>

            {/* Amount Input with formatting */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Enter Amount&nbsp;
                <span className="text-sm font-normal text-gray-500">
                  (₦{MIN_AMOUNT} – ₦{MAX_AMOUNT.toLocaleString()})
                </span>
              </h3>
              <Input
                id="amount"
                type="text"
                placeholder="Enter amount"
                value={amount !== null ? `₦${formatWithCommas(amount)}` : ""}
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                onChange={(e) => {
                  const raw = e.target.value;
                  const digits = raw.replace(/[^\d]/g, "");
                  if (digits === "") {
                    setAmount(null);
                  } else {
                    const numericValue = Number(digits);
                    setAmount(numericValue);
                  }
                  markTouched("amount");
                }}
                onBlur={() => markTouched("amount")}
                className={`h-12 ${
                  touched.amount && errors.amount
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-gray-300"
                }`}
                aria-describedby={errors.amount ? "amount-error" : undefined}
              />
              {touched.amount && errors.amount && (
                <p
                  id="amount-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.amount}
                </p>
              )}
            </div>

            {/* PIN Field */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">PIN</h3>
              <Input
                type="password"
                placeholder="Enter your 4-digit PIN"
                value={pin}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, PIN_LENGTH);
                  setPin(digits);
                  markTouched("pin");
                }}
                onBlur={() => markTouched("pin")}
                maxLength={PIN_LENGTH}
                className={cn(
                  "h-12 border-gray-300",
                  touched.pin && errors.pin ? "border-red-500" : ""
                )}
              />
              {touched.pin && errors.pin && (
                <p className="mt-1 text-sm text-red-600">{errors.pin}</p>
              )}
            </div>

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
                  "Buy Electricity"
                )}
              </Button>
            </div>
          </div>
        </Card>

        <TransferSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          data={{
            type: "electricity",
            recipient: verificationResponse?.name || "the recipient",
            token,
            amount: Number(responseAmount),
          }}
        />
      </main>
    </div>
  );
}