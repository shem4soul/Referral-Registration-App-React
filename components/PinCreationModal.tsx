"use client";
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { useCreatePin } from "@/apis/utility";

interface PinCreationModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const PinCreationModal = ({ isOpen, setIsOpen }) => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [errors, setErrors] = useState({ pin: "", confirmPin: "" });

  const { mutateAsync: createPinMutation, isPending } = useCreatePin();

  // Validate PIN: exactly 4 digits
  const validatePin = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length === 0) return "PIN is required.";
    if (digitsOnly.length !== 4) return "PIN must be exactly 4 digits.";
    return "";
  };

  // Validate confirm PIN matches
  const validateConfirmPin = (confirm: string, original: string) => {
    if (!confirm) return "Please confirm your PIN.";
    if (confirm !== original) return "PINs do not match.";
    return "";
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, "").slice(0, 4); // limit to 4 digits
    setPin(digitsOnly);
    setErrors((prev) => ({
      ...prev,
      pin: validatePin(digitsOnly),
      confirmPin: confirmPin ? validateConfirmPin(confirmPin, digitsOnly) : "",
    }));
  };

  const handleConfirmPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, "").slice(0, 4);
    setConfirmPin(digitsOnly);
    setErrors((prev) => ({
      ...prev,
      confirmPin: validateConfirmPin(digitsOnly, pin),
    }));
  };

  const isFormValid = () => {
    const pinValid = !validatePin(pin) && pin.length === 4;
    const confirmValid = !validateConfirmPin(confirmPin, pin);
    return pinValid && confirmValid;
  };

  const createPin = async () => {
    // Validate again before submit
    const pinError = validatePin(pin);
    const confirmError = validateConfirmPin(confirmPin, pin);
    if (pinError || confirmError) {
      setErrors({ pin: pinError, confirmPin: confirmError });
      toast.error("Please correct the errors before submitting.");
      return;
    }

    try {
      const res = await createPinMutation({
        pin,
        confirm_pin: confirmPin,
      });
      toast.success(res.data.message || "✅ PIN created successfully!");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "PIN creation failed. Please try again.");
    }
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-[999] flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="max-w-[35rem] w-full mx-6 bg-white z-[999] p-4 md:p-6 rounded-lg">
        <div className="flex items-center flex-col justify-center gap-4">
          <h1 className="text-xl font-semibold">Create Transaction PIN</h1>
          <p className="text-sm text-gray-600 text-center">
            Set a 4-digit PIN you&apos;ll use to authorize transactions.
          </p>

          <div className="w-full mt-4">
            {/* PIN Field */}
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">PIN</h2>
              <Input
                type="password"
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={handlePinChange}
                maxLength={4}
                className={`h-12 border-gray-300 ${
                  errors.pin ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              {errors.pin && (
                <p className="text-sm text-red-500 mt-1">{errors.pin}</p>
              )}
            </div>

            {/* Confirm PIN Field */}
            <div className="mt-4">
              <h2 className="font-semibold text-gray-900 mb-2">Confirm PIN</h2>
              <Input
                type="password"
                placeholder="Re-enter your PIN"
                value={confirmPin}
                onChange={handleConfirmPinChange}
                maxLength={4}
                className={`h-12 border-gray-300 ${
                  errors.confirmPin ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              {errors.confirmPin && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPin}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6">
          <button
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            className="border border-gray-700 text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-white transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={createPin}
            disabled={!isFormValid() || isPending}
            className="bg-blue-500 text-sm text-white px-2 py-1.5 rounded-md hover:bg-blue-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating..." : "Create PIN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinCreationModal;