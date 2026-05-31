import { useRouter, useSearchParams } from "next/navigation";

type ModeProp = {
  key?: string; // Make it optional
};

const useParamHook = ({ key = "mode" }: ModeProp = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get(key);
  const params = new URLSearchParams(searchParams.toString())

  const handleGetFilterParams = (key: string) => {
    return searchParams.get(key);
  }
  const handleFilterParams = (value: string , key: string) => {
    params.set(key, value.toString());
    router.push(`?${params.toString()}`)
  }

  const handleSearchParams = (param: string, key: string = "mode") => {
    router.push(`?${key}=${param}`);
  };

  const removeQueryParams = (base: string) => {
    router.push(`/${base}`);
  };

  return {
    router,
    searchParams,
    mode,
    removeQueryParams,
    handleSearchParams,
    handleFilterParams,
    handleGetFilterParams
  };
};


export default useParamHook;
