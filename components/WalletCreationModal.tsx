"use client"
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Input } from "./ui/input";
import { useCreateUserAccount, useCreateWalletMutation } from "@/apis/auth";
import { toast } from "react-toastify";


interface WalletCreationModalProps {
  cancel: boolean;
  setCancel: (cancel: boolean) => void;
}

const WalletCreationModal = ({ cancel, setCancel }: WalletCreationModalProps) => {
  const [bvn, setBvn] = useState("");
  const [nin, setNin] = useState("");
  const [errors, setErrors] = useState({ bvn: "", nin: "" });

  const { mutateAsync: createWalletMutation, isPending } = useCreateWalletMutation();
  const { mutateAsync: createUserAccountMutation, isPending: isCreatingUserAccount } = useCreateUserAccount();

  // Validate BVN (11 digits)
  const validateBvn = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length !== 11) return "BVN must be exactly 11 digits";
    return "";
  };

  // Validate NIN (11 digits)
  const validateNin = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length !== 11) return "NIN must be exactly 11 digits";
    return "";
  };

  const handleBvnChange = (e) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, "");
    setBvn(digitsOnly);
    setErrors((prev) => ({ ...prev, bvn: validateBvn(digitsOnly) }));
  };

  const handleNinChange = (e) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, "");
    setNin(digitsOnly);
    setErrors((prev) => ({ ...prev, nin: validateNin(digitsOnly) }));
  };

  const isFormValid = () => {
    return (
      bvn.length === 11 &&
      nin.length === 11 &&
      !errors.bvn &&
      !errors.nin
    );
  };

  const createWallet = async () => {
    // Double-check validation before submitting
    const bvnError = validateBvn(bvn);
    const ninError = validateNin(nin);
    if (bvnError || ninError) {
      setErrors({ bvn: bvnError, nin: ninError });
      toast.error("Please correct the errors before submitting.");
      return;
    }

    try {
      const res = await createWalletMutation({ bvn, nin });
      await createUserAccountMutation()
      toast.success(res?.data?.message || "✅ Wallet created successfully!");
      setBvn("");
      setNin("");
      setCancel(false);
    } catch (err) {
      console.error(err.response.data.message);
      toast.error(err?.response?.data?.message ||"Wallet creation failed. Please try again.");
    }
  };

  return (
    <div
      className={`${
        cancel ? "block" : "hidden"
      } fixed inset-0 z-[999] flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="max-w-[35rem] w-full mx-6 bg-white z-[999] p-4 md:p-6 rounded-lg">
        <div className="flex items-center flex-col justify-center gap-4">
          <h1 className="text-xl font-semibold">Provide the required information</h1>

          <div className="w-full mt-4">
            {/* BVN Field */}
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">BVN</h2>
              <Input
                type="text"
                placeholder="Enter 11-digit BVN"
                value={bvn}
                onChange={handleBvnChange}
                maxLength={11}
                className={`h-12 border-gray-300 ${
                  errors.bvn ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              {errors.bvn && (
                <p className="text-sm text-red-500 mt-1">{errors.bvn}</p>
              )}
            </div>

            {/* NIN Field */}
            <div className="mt-4">
              <h2 className="font-semibold text-gray-900 mb-2">NIN</h2>
              <Input
                type="text"
                placeholder="Enter 11-digit NIN"
                value={nin}
                onChange={handleNinChange}
                maxLength={11}
                className={`h-12 border-gray-300 ${
                  errors.nin ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              {errors.nin && (
                <p className="text-sm text-red-500 mt-1">{errors.nin}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6">
          <button
            onClick={() => setCancel(false)}
            disabled={isPending}
            className="border border-gray-700 text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-white transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={createWallet}
            disabled={!isFormValid() || isPending}
            className="bg-blue-500 text-sm text-white px-2 py-1.5 rounded-md hover:bg-blue-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating..." : "Create Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletCreationModal;