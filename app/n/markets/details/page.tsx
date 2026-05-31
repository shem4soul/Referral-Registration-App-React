import ProductDetails from '@/components/communities/ProductDetails';
import { Suspense } from 'react';

const MarketsDetailsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails />
    </Suspense>
  )
}

export default MarketsDetailsPage;
