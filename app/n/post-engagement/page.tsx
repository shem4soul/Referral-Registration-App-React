import PostEngagement from '@/components/pages/PostEngagement'
import React, { Suspense } from 'react'

const PostEngagementPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostEngagement />
    </Suspense>
  )
}

export default PostEngagementPage;
