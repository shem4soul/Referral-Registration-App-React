'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";

// const sources = [
//   { id: 1, name: "@draddo", icon: "👤" },
//   { id: 2, name: "Salary (Employer credit)", icon: "💼" },
//   { id: 3, name: "Freelance Income", icon: "💻" },
//   { id: 4, name: "Investment Returns", icon: "📈" },
// ];
const sources = [
  { id: 1, name: "Weekly Reward (Content Creator)"},
  { id: 2, name: "Salary (Employer credit)"},
  { id: 3, name: "Freelance Income"},
  { id: 4, name: "Investment Returns"},
];

export default function InboundTransfer() {
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState("");
  const [copied, setCopied] = useState(false);

  const accountNumber = "0040012023";
  const bankName = "Guarantee Trust Bank";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  //     {/* Header */}
  //     <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
  //         <button
  //           onClick={() => router.back()}
  //           className="p-2 hover:bg-gray-100 rounded-lg transition"
  //         >
  //           <ArrowLeft size={24} className="text-gray-900" />
  //         </button>
  //         <h1 className="text-2xl font-bold text-gray-900">Inbound Transfer</h1>
  //       </div>
  //     </header>

  //     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  //       {/* Account Details Card */}
  //       <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white mb-8">
  //         <div className="p-8">
  //           <h2 className="text-lg font-semibold mb-6">Your Account Details</h2>

  //           <div className="space-y-6">
  //             {/* Account Number */}
  //             <div>
  //               <p className="text-green-100 text-sm mb-2">Account Number</p>
  //               <div className="flex items-center gap-3">
  //                 <p className="text-2xl font-bold font-mono">{accountNumber}</p>
  //                 <button
  //                   onClick={handleCopy}
  //                   className="p-2 hover:bg-white/20 rounded-lg transition"
  //                 >
  //                   {copied ? (
  //                     <Check size={20} className="text-white" />
  //                   ) : (
  //                     <Copy size={20} className="text-white" />
  //                   )}
  //                 </button>
  //               </div>
  //             </div>

  //             {/* Bank Name */}
  //             <div>
  //               <p className="text-green-100 text-sm mb-2">Bank Name</p>
  //               <p className="text-xl font-semibold">{bankName}</p>
  //             </div>

  //             {/* Account Name */}
  //             <div>
  //               <p className="text-green-100 text-sm mb-2">Account Name</p>
  //               <p className="text-xl font-semibold">David Okafor</p>
  //             </div>
  //           </div>
  //         </div>
  //       </Card>

  //       {/* Transfer Source */}
  //       <Card className="bg-white mb-8">
  //         <div className="p-8">
  //           <h3 className="text-lg font-bold text-gray-900 mb-4">
  //             Select Transfer Source
  //           </h3>
  //           <p className="text-gray-600 mb-6">
  //             Who is sending you money? This helps us track your income sources.
  //           </p>

  //           <Select value={selectedSource} onValueChange={setSelectedSource}>
  //             <SelectTrigger className="h-12 border-gray-300 mb-6">
  //               <SelectValue placeholder="Select source" />
  //             </SelectTrigger>
  //             <SelectContent>
  //               {sources.map((source) => (
  //                 <SelectItem key={source.id} value={source.id.toString()}>
  //                   <span className="flex items-center gap-2">
  //                     <span>{source.icon}</span>
  //                     {source.name}
  //                   </span>
  //                 </SelectItem>
  //               ))}
  //             </SelectContent>
  //           </Select>

  //           {selectedSource && (
  //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  //               <p className="text-sm text-blue-900">
  //                 ✓ Share your account details above with the sender to complete
  //                 the transfer.
  //               </p>
  //             </div>
  //           )}
  //         </div>
  //       </Card>

  //       {/* Instructions */}
  //       <Card className="bg-white">
  //         <div className="p-8">
  //           <h3 className="text-lg font-bold text-gray-900 mb-6">
  //             How to Receive Money
  //           </h3>

  //           <div className="space-y-4">
  //             {[
  //               {
  //                 step: "1",
  //                 title: "Share Your Details",
  //                 desc: "Give your account number and bank name to the sender",
  //               },
  //               {
  //                 step: "2",
  //                 title: "Confirm Transfer",
  //                 desc: "Wait for the sender to initiate the transfer",
  //               },
  //               {
  //                 step: "3",
  //                 title: "Receive Funds",
  //                 desc: "Money will arrive in your account within minutes",
  //               },
  //             ].map((item, i) => (
  //               <div key={i} className="flex gap-4">
  //                 <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
  //                   {item.step}
  //                 </div>
  //                 <div>
  //                   <p className="font-semibold text-gray-900">{item.title}</p>
  //                   <p className="text-sm text-gray-600">{item.desc}</p>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>

  //           <Button
  //             onClick={() => router.back()}
  //             className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-8"
  //           >
  //             Back to Dashboard
  //           </Button>
  //         </div>
  //       </Card>
  //     </main>
  //   </div>
  // );

return(
  <div className="min-h-screen">
         <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
         <button
           onClick={() => router.back()}
           className="p-2 hover:bg-gray-100 rounded-lg transition"
         >
           <ArrowLeft size={24} className="text-gray-900" />
         </button>
         <h1 className="text-2xl font-bold text-gray-900">Inbound Transfer</h1>
       </div>
     </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
              Select Source
              </h3>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="h-12 border-gray-300 w-full mb-6">
                <SelectValue placeholder="Choose a source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source.id} value={source.id.toString()}>
                    <span className="flex items-center gap-2">
                      {source.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>  
            </Select>
           </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
              Amount
              </h3>
                <Input
                type="number"
                placeholder="Enter amount"
                className="h-12 border-gray-300 mb-6"
              />

           </div>

               <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
              PIN
              </h3>
                <Input
                type="number"
                placeholder="Enter PIN"
                className="h-12 border-gray-300 mb-6"
              />
           </div>
        </main>
  </div>
)
}

