// 'use client';

// import { useGetBankLists, useMakeTransfer, useVerifyAccount } from "@/apis/utility";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { ArrowLeft, AlertCircle, ChevronsUpDown, Check } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";
// import { toast } from "react-toastify";

// export default function OutboundTransfer() {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [selectedBank, setSelectedBank] = useState<{ bankName: string; bankCode: string } | null>(null);
//   const [accountNumber, setAccountNumber] = useState("");
//   const [amount, setAmount] = useState("");
//   const [narration, setNarration] = useState("");
//   const [pin, setPin] = useState("");

//   const { data: bankLists, isLoading } = useGetBankLists();
//   const { mutateAsync: verifyAccount, isPending: verifyingAccount } = useVerifyAccount();
//   const { mutateAsync: makeTransfer, isPending: makingTransfer } = useMakeTransfer();


//   // useEffect(() => {
//   //   if (selectedBank && accountNumber.length === 10) {
//   //   handleVerifyAccount();
//   //   }
//   // }, [accountNumber])
//   useEffect(() => {
//        handleTesting();
//   }, [])


//   const handleTesting=async()=>{
//      const data = await verifyAccount({
//           bankCode: "000013",
//           // bankCode: "090473",
//           accountNumber:"0216662574",
//         });
//         console.log("Account verification data:", data);
//   }



//   const handleVerifyAccount = async () => {
//     if (selectedBank && accountNumber) {
//       try {
//        const data = await verifyAccount({
//           bankCode: selectedBank.bankCode,
//           accountNumber,
//         });
//         console.log("Account verification data:", data);
//       } catch (error) {
//         console.error("Failed to verify account:", error);
//       }
//     }
//   };

//   const handleContinue = async() => {
//     if (selectedBank && accountNumber && amount && pin) {
//       // TODO: Implement transfer logic
//       console.log({
//         bankCode: selectedBank.bankCode,
//         accountNumber,
//         amount,
//         narration,
//         pin,
//       });
//       const payload={
//         bankCode: selectedBank.bankCode,
//         accountNumber,
//         amount,
//         narration,
//         pin,
//       }
//       await makeTransfer(payload,{
//             onSuccess: (res) => {
//             //  toast.success(res.data.message || "✅ Transfer completed successfully!");
//              router.push("/success");
//             },
//             onError: (err) => {
//                toast.error(err?.response.data.message||"There is an issue with your transfer. Please try again.");
//             }
//           });
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
//           <button
//             onClick={() => router.back()}
//             className="p-2 hover:bg-gray-100 rounded-lg transition"
//           >
//             <ArrowLeft size={24} className="text-gray-900" />
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Outbound Transfer
//           </h1>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Info Alert */}
//         <Card className="bg-orange-50 border-orange-200 mb-8">
//           <div className="p-4 flex gap-3">
//             <AlertCircle
//               size={20}
//               className="text-orange-600 flex-shrink-0 mt-0.5"
//             />
//             <div>
//               <p className="font-semibold text-orange-900">
//                 Transfer to Other Banks
//               </p>
//               <p className="text-sm text-orange-800 mt-1">
//                 At least ₦500 views is required in a week to get your reward
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Transfer Form */}
//         <Card className="bg-white">
//           <div className="p-8">
//             <h2 className="text-xl font-bold text-gray-900 mb-6">
//               Transfer Details
//             </h2>

//             <div className="space-y-6">
//               {/* Bank Selection - Searchable Combobox */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">
//                   Select Bank
//                 </label>
//                 <Popover open={open} onOpenChange={setOpen}>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       role="combobox"
//                       aria-expanded={open}
//                       className="w-full justify-between h-12 border-gray-300 font-normal"
//                     >
//                       {selectedBank
//                         ? selectedBank.bankName
//                         : isLoading
//                         ? "Loading banks..."
//                         : "Choose a bank..."}
//                       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-full p-0" align="start">
//                     <Command>
//                       <CommandInput placeholder="Search bank..." />
//                       <CommandList>
//                         <CommandEmpty>No bank found.</CommandEmpty>
//                         <CommandGroup>
//                           {bankLists?.map((bank) => (
//                             <CommandItem
//                               key={bank.bankCode}
//                               value={bank.bankName}
//                               onSelect={(currentValue) => {
//                                 setSelectedBank(
//                                   selectedBank?.bankName === currentValue
//                                     ? null
//                                     : { bankName: bank.bankName, bankCode: bank.bankCode }
//                                 );
//                                 setOpen(false);
//                               }}
//                             >
//                               <Check
//                                 className={cn(
//                                   "mr-2 h-4 w-4",
//                                   selectedBank?.bankCode === bank.bankCode
//                                     ? "opacity-100"
//                                     : "opacity-0"
//                                 )}
//                               />
//                               {bank.bankName}
//                             </CommandItem>
//                           ))}
//                         </CommandGroup>
//                       </CommandList>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//               </div>

//               {/* Account Number */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">
//                   Account Number
//                 </label>
//                 <Input
//                   type="text"
//                   placeholder="Enter account number"
//                   value={accountNumber}
//                   onChange={(e) => setAccountNumber(e.target.value)}
//                   className="h-12 border-gray-300"
//                 />
//               </div>

//               {/* Amount */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">
//                   Amount (₦)
//                 </label>
//                 <Input
//                   type="number"
//                   placeholder="Enter amount"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className="h-12 border-gray-300"
//                 />
//               </div>

//               {/* Narration */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">
//                   Narration (Optional)
//                 </label>
//                 <Input
//                   type="text"
//                   placeholder="What is this transfer for?"
//                   value={narration}
//                   onChange={(e) => setNarration(e.target.value)}
//                   className="h-12 border-gray-300"
//                 />
//               </div>

//               {/* PIN */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">
//                   PIN
//                 </label>
//                 <Input
//                   type="password"
//                   placeholder="Enter PIN"
//                   value={pin}
//                   onChange={(e) => setPin(e.target.value)}
//                   className="h-12 border-gray-300"
//                   maxLength={4}
//                 />
//               </div>

//               {/* Transfer Fee Info */}
//               {amount && (
//                 <Card className="bg-blue-50 border-blue-200 p-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-blue-600">Transfer Amount</p>
//                       <p className="text-lg font-bold text-blue-900">
//                         ₦{amount}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-blue-600">Transfer Fee</p>
//                       <p className="text-lg font-bold text-blue-900">₦0</p>
//                     </div>
//                   </div>
//                 </Card>
//               )}

//               {/* Action Buttons */}
//               <div className="flex gap-4 pt-4">
//                 <Button
//                   onClick={() => router.back()}
//                   variant="outline"
//                   className="flex-1 h-12 border-gray-300 text-gray-900"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleContinue}
//                   disabled={!selectedBank || !accountNumber || !amount || !pin}
//                   className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
//                 >
//                   Continue
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </main>
//     </div>
//   );
// }










'use client';

import { useGetBankLists, useMakeTransfer, useVerifyAccount } from "@/apis/utility";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, AlertCircle, ChevronsUpDown, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn, formatWithCommas } from "@/lib/utils";
import { toast } from "react-toastify";
import { TransferPayload } from "@/types/type-props";
import TransferSuccessModal from "./TransferSuccessModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Bank {
  bankName: string;
  bankCode: string;
  isNew?: boolean;
}

interface VerificationSuccess {
  bankCode: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
}

interface VerificationError {
  status: false;
  message: string;
  data: null;
}

export type VerificationResponse = VerificationSuccess | VerificationError;

interface FormErrors {
  bank?: string;
  accountNumber?: string;
  amount?: string;
  pin?: string;
}

type TouchedFields = Record<keyof FormErrors, boolean>;

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 5_000_000;
const PIN_LENGTH = 4;

// ─── Component ────────────────────────────────────────────────────────────────

export default function OutboundTransfer() {
  const router = useRouter();

  // ── Form state ─────────────────────────────────────────────────────────────
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [pin, setPin] = useState("");

  // ── Verification state ─────────────────────────────────────────────────────
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [accountName, setAccountName] = useState("");
  const [verificationError, setVerificationError] = useState("");


  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // ── Validation state ───────────────────────────────────────────────────────
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    bank: false,
    accountNumber: false,
    amount: false,
    pin: false,
  });

  // ── API hooks ──────────────────────────────────────────────────────────────
  const { data: bankLists, isLoading: loadingBanks } = useGetBankLists();
  const { mutateAsync: verifyAccount, isPending: verifying } = useVerifyAccount();
  const { mutateAsync: makeTransfer, isPending: makingTransfer } = useMakeTransfer();

  // ── Verification trigger (when account number reaches 10 digits) ──────────
  useEffect(() => {
    const normalized = accountNumber.replace(/\D/g, "");
    if (normalized.length === 10 && selectedBank && verificationStatus !== "loading") {
      handleVerifyAccount();
    } else if (normalized.length !== 10) {
      // Reset verification data when number is not complete
      setVerificationStatus("idle");
      setAccountName("");
      setVerificationError("");
    }
  }, [accountNumber, selectedBank]);

  // ── Real-time validation ───────────────────────────────────────────────────
  useEffect(() => {
    const next: FormErrors = {};

    if (touched.bank && !selectedBank) {
      next.bank = "Please select a bank.";
    }

    if (touched.accountNumber) {
      const digits = accountNumber.replace(/\D/g, "");
      if (!digits) {
        next.accountNumber = "Account number is required.";
      } else if (digits.length !== 10) {
        next.accountNumber = "Account number must be 10 digits.";
      }
    }

    if (touched.amount) {
      const num = Number(amount);
      if (!amount) {
        next.amount = "Amount is required.";
      } else if (isNaN(num) || num <= 0) {
        next.amount = "Please enter a valid amount.";
      } else if (num < MIN_AMOUNT) {
        next.amount = `Minimum amount is ₦${MIN_AMOUNT}.`;
      } else if (num > MAX_AMOUNT) {
        next.amount = `Maximum amount is ₦${MAX_AMOUNT.toLocaleString()}.`;
      }
    }

    if (touched.pin) {
      const digits = pin.replace(/\D/g, "");
      if (!pin) {
        next.pin = "PIN is required.";
      } else if (digits.length !== PIN_LENGTH) {
        next.pin = `PIN must be ${PIN_LENGTH} digits.`;
      }
    }

    setErrors(next);
  }, [selectedBank, accountNumber, amount, pin, touched]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const markTouched = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleVerifyAccount = async () => {
    if (!selectedBank) return;
    const digits = accountNumber.replace(/\D/g, "");
    if (digits.length !== 10) return;

    setVerificationStatus("loading");
    setVerificationError("");
    setAccountName("");

    try {
      const response = await verifyAccount({
        bankCode: selectedBank.bankCode,
        accountNumber: digits,
      }) as VerificationResponse;
console.log("Verification response:", response);
      if ("accountName" in response && response.accountName) {
        // Success
        setAccountName(response.accountName);
        setVerificationStatus("success");
        setVerificationError("");
      } else {
        // Error response
        setVerificationStatus("error");
        setVerificationError("Account verification failed.");
      }
    } catch (error) {
      setVerificationStatus("error");
      setVerificationError(error?.response?.data?.message || "Unable to verify account. Please try again.");
    }
  };

  const validateAll = (): boolean => {
    const allTouched: TouchedFields = {
      bank: true,
      accountNumber: true,
      amount: true,
      pin: true,
    };
    setTouched(allTouched);

    const errs: FormErrors = {};

    if (!selectedBank) errs.bank = "Please select a bank.";

    const accountDigits = accountNumber.replace(/\D/g, "");
    if (!accountDigits) {
      errs.accountNumber = "Account number is required.";
    } else if (accountDigits.length !== 10) {
      errs.accountNumber = "Account number must be 10 digits.";
    }

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

  const handleContinue = async () => {
    if (!validateAll()) return;
    if (!selectedBank) return;
    if (verificationStatus !== "success") {
      toast.error("Please verify the account number first.");
      return;
    }

    const payload: TransferPayload = {
      bankCode: selectedBank.bankCode,
      accountNumber: accountNumber.replace(/\D/g, ""),
      amount: Number(amount),
      narration: narration || "Transfer",
      accountName,
      bankName: selectedBank.bankName,
      pin: pin.replace(/\D/g, ""),
    };

    await makeTransfer(payload, {
      onSuccess: (res) => {
        // toast.success(res?.data?.message || "✅ Transfer completed successfully!");
        setIsSuccessModalOpen(true);
        setAccountName("");
        setVerificationStatus("idle");
        setSelectedBank(null);
        setAccountNumber("");
        setAmount("");
        setNarration("");
        setPin("");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "There is an issue with your transfer. Please try again.");
        // toast.error("There is an issue with your transfer. Please try again.");
      },
    });
  };

  const isFormComplete =
    !!selectedBank &&
    accountNumber.replace(/\D/g, "").length === 10 &&
    Number(amount) >= MIN_AMOUNT &&
    pin.replace(/\D/g, "").length === PIN_LENGTH &&
    verificationStatus === "success";

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Outbound Transfer
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Alert – now used for verification errors */}
        {/* {(verificationStatus === "error" || verificationError) && (
          <Card className="bg-orange-50 border-orange-200 mb-8">
            <div className="p-4 flex gap-3">
              <AlertCircle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900">Verification Failed</p>
                <p className="text-sm text-orange-800 mt-1">{verificationError}</p>
              </div>
            </div>
          </Card>
        )} */}

        {/* Transfer Form */}
        <Card className="bg-white">
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Transfer Details
            </h2>

            <div className="space-y-6">
              {/* Bank Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Bank
                </label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-full justify-between h-12 border-gray-300 font-normal",
                        touched.bank && errors.bank ? "border-red-500" : ""
                      )}
                    >
                      {selectedBank
                        ? selectedBank.bankName
                        : loadingBanks
                        ? "Loading banks..."
                        : "Choose a bank..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search bank..." />
                      <CommandList>
                        <CommandEmpty>No bank found.</CommandEmpty>
                        <CommandGroup>
                          {bankLists?.map((bank) => (
                            <CommandItem
                              key={bank.bankCode}
                              value={bank.bankName}
                              onSelect={() => {
                                setSelectedBank(bank);
                                setOpen(false);
                                markTouched("bank");
                                // Reset verification when bank changes
                                setVerificationStatus("idle");
                                setAccountName("");
                                setVerificationError("");
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedBank?.bankCode === bank.bankCode
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {bank.bankName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {touched.bank && errors.bank && (
                  <p className="mt-1 text-sm text-red-600">{errors.bank}</p>
                )}
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Account Number
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter 10-digit account number"
                    value={accountNumber}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      setAccountNumber(digits);
                      markTouched("accountNumber");
                    }}
                    onBlur={() => markTouched("accountNumber")}
                    maxLength={10}
                    className={cn(
                      "h-12 border-gray-300 pr-10",
                      touched.accountNumber && errors.accountNumber ? "border-red-500" : ""
                    )}
                  />
                  {verifying && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-blue-600" />
                  )}
                </div>
                {touched.accountNumber && errors.accountNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
                )}

                {/* Verified account name display */}
                {verificationStatus === "success" && accountName && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      <span className="font-semibold"></span> {accountName}
                    </p>
                  </div>
                )}
                {verificationStatus === "error" && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">
                      <span className="font-semibold"></span> {verificationError}
                    </p>
                  </div>
                )}
              </div>

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
                  onClick={() => router.back()}
                  variant="outline"
                  className="flex-1 h-12 border-gray-300 text-gray-900"
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
                    "Continue"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <TransferSuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} data={{type:'transfer',recipient:accountName,amount:Number(amount)}} />
      </main>
    </div>
  );
}