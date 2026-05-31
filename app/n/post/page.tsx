import PostDetails from '@/components/pages/PostDetails'
import { Suspense } from "react";

const PostPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostDetails />
    </Suspense>
  )
}

export default PostPage;
