import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clientApi from "./clientApi";
import { PurchasePayload, TransferPayload } from "@/types/type-props";
import { AxiosError } from "axios";
import { VerificationResponse } from "@/components/wallet/OutboundTransfer";
import { MeterVerificationPayload, MeterVerificationResponse } from "@/components/wallet/Electricity";

// const baseUrl='https://lendnode.creditclan.com/gateway/buypower/buypower/buypower/'
const additionalUrl='/payment/bills/'

interface DataResponse {
  status: number;
  message: string;
  data: {
    message: string;
  }
}
interface DataElectricityResponse {
  status: number;
  message: string;
  data: {
    token: string;
  }
}

interface ErrorResponse {
  status: boolean;
  message: string;
  data: null;
}

export const useCheckMeter = () => {
   return useMutation({
    mutationFn: async (payload) => {
      return await clientApi.post(`${additionalUrl}checkmeter`,payload).then((res) => {
       return res.data;
      });
    },
  });
};

export const usePurchase = () => {
  const queryClient=useQueryClient()
   return useMutation<DataElectricityResponse, AxiosError<ErrorResponse>, PurchasePayload>({
    mutationFn: async (payload) => {
      return await clientApi.post(`${additionalUrl}create_order`,payload).then((res) => {
       return res.data;
      });
    },
    onSuccess:()=>{
     queryClient.invalidateQueries({queryKey: ["wallet-balance"]})
    },
    onError: (err) => {
      console.log(err);
    }
  });
};
export const useVerifyPayment = () => {
   return useMutation({
    mutationFn: async (id:string) => {
      return await clientApi.post(`${additionalUrl}verify_bill/`,{id}).then((res) => {
       return res.data;
      });
    },
    onError: (err) => {
      console.log(err);
    }
  });
};
export const useGetPlan = () => {
   return useMutation({
    mutationFn: async (payload:{vertical:string,provider:string}) => {
      return await clientApi.post(`${additionalUrl}price_list`,payload).then((res) => {
       return res?.data?.data;
      });
    },
    onError: (err) => {
      console.log(err);
    }
  });
};
export const useGetBranches = () => {
   return useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
         return [
        { id: 1, name: "EKO" },
        { id: 2, name: "ABUJA" },
        { id: 3, name: "IKEJA" },
         { id: 4, name: "PH" },
         { id: 5, name: "IBADAN" },
         { id: 6, name: "ENUGU" },
         { id: 7, name: "JOS" },
         { id: 8, name: "KADUNA" },
         { id: 9, name: "KANO" },
         { id: 10, name: "BENIN" },
         { id: 11, name: "YOLA" },
      ]
      // return await clientApi.get(`${additionalUrl}discos`).then((res) => {
      //  return res?.data?.data;
      // });
    },
  });
};


export const useGetBankLists = () => {
  return useQuery({
    queryKey: ["bank_lists"],
    queryFn: async () => {
      const response = await clientApi.get("/payment/bank_lists");
   return response?.data?.data
    },
  });
};

export const useVerifyAccount = () => {
   return useMutation<VerificationResponse, AxiosError<ErrorResponse>, { bankCode: string, accountNumber: string,}>({
    mutationFn: async (payload) => {
      return await clientApi.post("/payment/verify_account",payload).then((res) => {
       return res?.data?.data;
      });
    },
    onError: (err) => {
      console.log(err);
    }
  });
};

export const useVerifyMeterNumber = () => {
   return useMutation<MeterVerificationResponse, AxiosError<ErrorResponse>, MeterVerificationPayload>({
    mutationFn: async (payload) => {
      return await clientApi.post("/payment/bills/check_meter",payload).then((res) => {
       return res?.data?.data;
      });
    },
    onError: (err) => {
      console.log(err);
    }
  });
};

export const useMakeTransfer = () => {
  const queryClient=useQueryClient()
   return useMutation<DataResponse, AxiosError<ErrorResponse>, TransferPayload>({
    mutationFn: async (payload) => {
      return await clientApi.post("/payment/transfer",payload).then((res) => {
       return res?.data;
      });
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["wallet-balance"]})
    },
    onError: (err) => {
      console.log(err);
    }
  });
};
export const useCreatePin = () => {
  const queryClient=useQueryClient()
   return useMutation<DataResponse, AxiosError<ErrorResponse>, { pin:string, confirm_pin: string, }>({
    mutationFn: async (payload) => {
      return await clientApi.post("/payment/create_pin",payload).then((res) => {
       return res?.data?.data;
      });
    },
    onSuccess:()=>{
     queryClient.invalidateQueries({queryKey: ["profile"]})
      queryClient.invalidateQueries({queryKey: ["user-account"]})
    },
    onError: (err) => {
      console.log(err);
    }
  });
};


export const useGetTransactions = () => {
   return useMutation({
    mutationFn: async (payload:{ page: number, start_date: string, end_date: string }) => {
      return await clientApi.post("/payment/transactions",payload).then((res) => {
       return res?.data?.data;
      });
    },
    onError: (err) => {
      console.log(err);
    }
  });
};


export const useGetUserAccountDetails = (userId: string) => {
   return useQuery({
    queryKey: ["other-user-account", userId],
    queryFn: async () => {
     return await clientApi.get(`/payment/user/account/?userId=${userId}`).then((res) => {
       return res?.data?.data;
      });
    },
  });
};