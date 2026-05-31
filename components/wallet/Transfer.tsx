'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Plus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const contacts = [
  { id: 1, name: "Adekunle Tunde", avatar: "AT", color: "bg-blue-500" },
  { id: 2, name: "Chioma Okafor", avatar: "CO", color: "bg-purple-500" },
  { id: 3, name: "Ibrahim Hassan", avatar: "IH", color: "bg-green-500" },
  { id: 4, name: "Zainab Malik", avatar: "ZM", color: "bg-pink-500" },
  { id: 5, name: "Emeka Nwosu", avatar: "EN", color: "bg-orange-500" },
  { id: 6, name: "Fatima Ahmed", avatar: "FA", color: "bg-red-500" },
];

export default function Transfer() {
  const router = useRouter();
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  //         <h1 className="text-2xl font-bold text-gray-900">Transfer</h1>
  //       </div>
  //     </header>

  //     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  //       {/* Transfer Info */}
  //       <Card className="bg-white mb-8">
  //         <div className="p-6">
  //           <h2 className="text-lg font-bold text-gray-900 mb-4">
  //             Send Money to Your Contacts
  //           </h2>
  //           <p className="text-gray-600 mb-6">
  //             Select a contact or add a new one to transfer funds instantly.
  //           </p>

  //           {/* Search Bar */}
  //           <div className="relative mb-6">
  //             <Search
  //               size={20}
  //               className="absolute left-3 top-3 text-gray-400"
  //             />
  //             <Input
  //               placeholder="Search contacts..."
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //               className="pl-10 h-12 border-gray-300"
  //             />
  //           </div>

  //           {/* Contacts Grid */}
  //           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  //             {filteredContacts.map((contact) => (
  //               <button
  //                 key={contact.id}
  //                 onClick={() => setSelectedContact(contact.id)}
  //                 className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-3 ${
  //                   selectedContact === contact.id
  //                     ? "border-blue-500 bg-blue-50"
  //                     : "border-gray-200 hover:border-blue-300 bg-white"
  //                 }`}
  //               >
  //                 <div
  //                   className={`w-12 h-12 rounded-full ${contact.color} flex items-center justify-center text-white font-bold text-lg`}
  //                 >
  //                   {contact.avatar}
  //                 </div>
  //                 <p className="text-sm font-semibold text-gray-900 text-center">
  //                   {contact.name}
  //                 </p>
  //               </button>
  //             ))}

  //             {/* Add New Contact */}
  //             <button className="p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-blue-50">
  //               <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
  //                 <Plus size={24} className="text-gray-600" />
  //               </div>
  //               <p className="text-sm font-semibold text-gray-600">Add New</p>
  //             </button>
  //           </div>
  //         </div>
  //       </Card>

  //       {/* Transfer Details */}
  //       {selectedContact && (
  //         <Card className="bg-white">
  //           <div className="p-6">
  //             <h3 className="text-lg font-bold text-gray-900 mb-6">
  //               Transfer Details
  //             </h3>

  //             <div className="space-y-4 mb-6">
  //               <div>
  //                 <label className="block text-sm font-semibold text-gray-900 mb-2">
  //                   Recipient
  //                 </label>
  //                 <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
  //                   <p className="font-semibold text-gray-900">
  //                     {contacts.find((c) => c.id === selectedContact)?.name}
  //                   </p>
  //                 </div>
  //               </div>

  //               <div>
  //                 <label className="block text-sm font-semibold text-gray-900 mb-2">
  //                   Amount (₦)
  //                 </label>
  //                 <Input
  //                   type="number"
  //                   placeholder="Enter amount"
  //                   className="h-12 border-gray-300"
  //                 />
  //               </div>

  //               <div>
  //                 <label className="block text-sm font-semibold text-gray-900 mb-2">
  //                   Description (Optional)
  //                 </label>
  //                 <Input
  //                   placeholder="What is this transfer for?"
  //                   className="h-12 border-gray-300"
  //                 />
  //               </div>
  //             </div>

  //             <Button
  //               onClick={() => router.push("/success")}
  //               className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
  //             >
  //               Continue Transfer
  //             </Button>
  //           </div>
  //         </Card>
  //       )}
  //     </main>
  //   </div>
  // );

  const handleNavigation = (type: string) => {
      router.push(`/n/wallet/${type}`);
    }



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
          <h1 className="text-2xl font-bold text-gray-900">Transfer</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  
<div className="space-y-12">
  <div className="flex items-center justify-between">
  <div>
      <h2 className="text-lg font-bold text-gray-900">
      Inbound Transfer
    </h2>
    <p className="text-sm text-gray-500">Transfer to other users</p>
  </div>
    <button
            onClick={()=>handleNavigation('inbound')}
            className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <ArrowRight size={24} className="text-gray-900" />
          </button>
  </div>
  <div className="flex items-center justify-between">
  <div>
      <h2 className="text-lg font-bold text-gray-900">
      Outbound Transfer
    </h2>
    <p className="text-sm text-gray-500">Transfer to other local bank accounts</p>
  </div>
    <button
            onClick={()=>handleNavigation('outbound')}
            className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <ArrowRight size={24} className="text-gray-900" />
          </button>
  </div>
  <div className="flex items-center justify-between">
  <div>
      <h2 className="text-lg font-bold text-gray-900">
      Buy Airtime
    </h2>
    <p className="text-sm text-gray-500">Purchase airtime for your yourself and others</p>
  </div>
    <button
            onClick={()=>handleNavigation('airtime')}
            className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <ArrowRight size={24} className="text-gray-900" />
          </button>
  </div>
</div>
      </main>

      </div>
  )
}

