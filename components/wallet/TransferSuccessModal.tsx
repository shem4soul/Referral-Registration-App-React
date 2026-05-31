'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { useLocation } from "wouter";
import { CheckCircle, Download, Share2, Home, Check, Copy } from "lucide-react";
import vector from "@/assets/images/Vector.png";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

interface TransferSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    recipient: string;
    amount: number;
    type?: string;
    token?: string;
  }
}

export default function TransferSuccessModal({ isOpen, onClose, data={recipient:'John Doe', amount:200000, type:'transfer'} }: TransferSuccessModalProps) {
    const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;


    const handleCopy = () => {
    navigator.clipboard.writeText("0040012023");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return(
     <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={() => onClose()} />
      <div className="relative w-full max-w-lg mx-4">
        <Card className="bg-white">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-10">
            <img src={vector.src} alt="Success Icon" className="w-18 h-18" />
          </div>

          {/* Success Message */}
         { data.type === 'transfer' ? (
           <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Transfer Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            You have successfully transferred <span className="font-bold">{formatCurrency(data.amount)}</span> to <span className="font-semibold">{data.recipient}</span>
          </p>
          </div>
         ):data.type === "airtime" ? (
           <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Airtime Purchase Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            You have successfully sent an airtime of <span className="font-bold">{formatCurrency(data.amount)}</span> to <span className="font-semibold">{data.recipient}</span>
          </p>
          </div>
         ):data.type === "data" ?(
           <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Data Purchase Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            You have successfully sent an data of <span className="font-bold">{formatCurrency(data.amount)}</span> to <span className="font-semibold">{data.recipient}</span>
          </p>
          </div>
         ):data.type === "electricity" ?(
           <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-2">
            You have successfully paid <span className="font-bold">{formatCurrency(data.amount)}</span>.
          </p>
          <p className="text-gray-600 mb-8 flex items-center gap-2J">
           Here is your token: <span className="font-semibold">{data.token}</span><button
                      onClick={handleCopy}
                      className="p-2 hover:bg-white/50 rounded-lg transition"
                    >
                      {copied ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <Copy size={16} className="text-green-600" />
                      )}
                    </button>
          </p>
          </div>
         ):(
           <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tv Subscription Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            You have successfully made <span className="font-bold">{formatCurrency(data.amount)}</span> subscription on your <span className="font-bold">{data.recipient}</span>
          </p>
          </div>
         )}


      <Button
            onClick={() => onClose()}
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full cursor-pointer flex items-center justify-center gap-2 mt-20"
          >
            Cancel
          </Button>
       
        </div>
      </Card>
      </div>
    </div>
  )
}

