import MainDetailsPage from "@/components/communities/details/MainDetailsPage";
import { Suspense } from "react";

const CommunitiesDetailsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainDetailsPage />
    </Suspense>
  )
}

export default CommunitiesDetailsPage;
