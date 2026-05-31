"use client";
/* eslint-disable react/prop-types */

interface ConfirmationModalProps {
  cancel: boolean;
  setCancel: (cancel: boolean) => void;
  handleCancelPayment: () => void;
}
const ConfirmationModal = ({cancel,setCancel,handleCancelPayment}: ConfirmationModalProps) => {



  return (
       <div className={`${cancel ? 'block' : 'hidden'} fixed inset-0 z-[999] flex items-center justify-center`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="max-w-[22rem] w-full mx-6 bg-white z-[999] p-4 rounded">
    <div className="flex items-center flex-col justify-center gap-4">
    <h1 className="text-gray-700 text-lg font-semibold">Are you sure you want to cancel?</h1>
    <p className="text-gray-400 text-sm">Once this operation is performed, it cannot be ondone</p>
    </div>
       
       <div className="flex items-center justify-end space-x-4 pt-6">
          <button
            onClick={()=>setCancel(false)}
            className="border border-gray-700 text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-white transition"
          >
           No, cancel
          </button>
          <button
            onClick={handleCancelPayment}
            className="bg-blue-500 text-sm text-white px-2 py-1.5 rounded-md hover:bg-blue-600 transition"
          >
           Yes, Proceed
          </button>
       </div>
      </div>
      
      </div>
  )
}

export default ConfirmationModal