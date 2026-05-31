import { useState } from "react";
import { toast } from "react-toastify";
import { useMakeTransfer } from "@/apis/utility";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn, formatWithCommas } from "@/lib/utils";
import { TransferPayload } from "@/types/type-props";
import TransferSuccessModal from "./wallet/TransferSuccessModal";

// ─── Types ────────────────────────────────────────────────────────────────────

// interface TransferPayload {
//   bankCode: string;
//   accountNumber: string;
//   amount: number;
//   narration: string;
//   accountName: string;
//   bankName: string;
//   pin: string;
// }

interface FormErrors {
  amount?: string;
  pin?: string;
}

type TouchedFields = Record<keyof FormErrors, boolean>;

interface UserAccountDetails {
  accountNumber: string;
  bankCode: string;
  bankName: string;
  accountName: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userAccount: UserAccountDetails;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 5_000_000;
const PIN_LENGTH = 4;

// ─── Component ────────────────────────────────────────────────────────────────

const PaymentModal = ({ isOpen, setIsOpen, userAccount }: PaymentModalProps) => {
  // ── Form state ─────────────────────────────────────────────────────────────
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [pin, setPin] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // ── Validation state ───────────────────────────────────────────────────────
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    amount: false,
    pin: false,
  });

  const { mutateAsync: makeTransfer, isPending: makingTransfer } = useMakeTransfer();

  // ── Validation helpers ─────────────────────────────────────────────────────
  const validateAll = (): boolean => {
    const allTouched: TouchedFields = { amount: true, pin: true };
    setTouched(allTouched);

    const errs: FormErrors = {};

    const num = Number(amount);
    if (!amount) {
      errs.amount = "Amount is required.";
    } else if (isNaN(num) || num <= 0) {
      errs.amount = "Please enter a valid amount.";
    } else if (num < MIN_AMOUNT) {
      errs.amount = `Minimum amount is ₦${MIN_AMOUNT}.`;
    } else if (num > MAX_AMOUNT) {
      errs.amount = `Maximum amount is ₦${MAX_AMOUNT.toLocaleString()}.`;
    }

    const pinDigits = pin.replace(/\D/g, "");
    if (!pin) {
      errs.pin = "PIN is required.";
    } else if (pinDigits.length !== PIN_LENGTH) {
      errs.pin = `PIN must be ${PIN_LENGTH} digits.`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const markTouched = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // ── Submit handler ─────────────────────────────────────────────────────────
  const handleContinue = async () => {
    if (!validateAll()) return;

    const payload: TransferPayload = {
      bankCode: userAccount.bankCode,
      accountNumber: userAccount.accountNumber,
      amount: Number(amount),
      narration: narration || "Transfer",
      accountName: userAccount.accountName,
      bankName: userAccount.bankName,
      pin: pin.replace(/\D/g, ""),
    };

    await makeTransfer(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message || "✅ Transfer completed successfully!");
    setAmount("");
        setNarration("");
        setPin("");
        setIsOpen(false); // Close modal on success
      },
      onError: (err) => {
        console.log({err});
        toast.error(err?.response?.data?.message || "There is an issue with your transfer. Please try again.");
        // toast.error("There is an issue with your transfer. Please try again.");
      },
    });
  };

  // ── Form validity for enabling the button ──────────────────────────────────
  const isFormComplete = (() => {
    const num = Number(amount);
    const pinDigits = pin.replace(/\D/g, "");
    return (
      amount &&
      !isNaN(num) &&
      num >= MIN_AMOUNT &&
      pinDigits.length === PIN_LENGTH
    );
  })();

  // ── Render ─────────────────────────────────────────────────────────────────
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-lg mx-4">
        <Card className="bg-white">
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Transfer Details</h2>

            {/* Recipient Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Receiving Account</p>
              <p className="font-semibold text-gray-900">{userAccount.accountName}</p>
              <p className="text-sm text-gray-700">
                {userAccount.bankName} • {userAccount.accountNumber}
              </p>
            </div>

            <div className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Amount (₦)
                </label>
                <Input
                  type="text"
                  placeholder="Enter amount"
                  value={
                                    amount !== null ? `₦${formatWithCommas(Number(amount))}` : ""
                                  }
                  onChange={(e) => {
                      const raw = e.target.value;
                  const digits = raw.replace(/[^\d]/g, "");
                  if (digits === "") {
                    setAmount(null);
                  } else {
                    setAmount(digits);
                  }
                    markTouched("amount");
                  }}
                  onBlur={() => markTouched("amount")}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  className={cn(
                    "h-12 border-gray-300",
                    touched.amount && errors.amount ? "border-red-500" : ""
                  )}
                />
                {touched.amount && errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>

              {/* Narration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Narration (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="What is this transfer for?"
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                  className="h-12 border-gray-300"
                />
              </div>

              {/* PIN */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  PIN
                </label>
                <Input
                  type="password"
                  placeholder="Enter 4-digit PIN"
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

              {/* Transfer Fee Info */}
              {amount && Number(amount) >= MIN_AMOUNT && (
                <Card className="bg-blue-50 border-blue-200 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-600">Transfer Amount</p>
                      <p className="text-lg font-bold text-blue-900">
                        ₦{Number(amount).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Transfer Fee</p>
                      <p className="text-lg font-bold text-blue-900">₦0</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="flex-1 h-12 border-gray-300 text-gray-900"
                  disabled={makingTransfer}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!isFormComplete || makingTransfer}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                >
                  {makingTransfer ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Transfer"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <TransferSuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} data={{type:'transfer',recipient:userAccount.accountName,amount:Number(amount)}} />
    </div>
  );
};

export default PaymentModal;