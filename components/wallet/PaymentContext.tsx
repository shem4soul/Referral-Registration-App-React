import React, { createContext, useContext, useState } from "react";

export type PaymentType = "transfer" | "outbound" | "inbound" | "airtime" | "data" | null;

export interface PaymentState {
  type: PaymentType;
  step: number;
  recipient?: string;
  amount?: string;
  description?: string;
  bank?: string;
  accountNumber?: string;
  phoneNumber?: string;
  provider?: string;
  plan?: string;
  source?: string;
}

interface PaymentContextType {
  payment: PaymentState;
  setPayment: (payment: PaymentState) => void;
  updatePayment: (updates: Partial<PaymentState>) => void;
  resetPayment: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [payment, setPayment] = useState<PaymentState>({
    type: null,
    step: 0,
  });

  const updatePayment = (updates: Partial<PaymentState>) => {
    setPayment((prev) => ({ ...prev, ...updates }));
  };

  const resetPayment = () => {
    setPayment({ type: null, step: 0 });
  };

  const nextStep = () => {
    setPayment((prev) => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    setPayment((prev) => ({ ...prev, step: Math.max(0, prev.step - 1) }));
  };

  return (
    <PaymentContext.Provider
      value={{ payment, setPayment, updatePayment, resetPayment, nextStep, prevStep }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within PaymentProvider");
  }
  return context;
}

