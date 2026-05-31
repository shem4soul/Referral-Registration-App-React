'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

const PostDetails = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Details</h1>
                <p className="text-gray-600 mb-6 font-mono bg-gray-50 p-2 rounded">ID: {id}</p>
                <p className="text-gray-500 mb-8 italic">This is a placeholder for the post details page. In a real app, we would fetch post data for ID: {id}</p>
                <Button onClick={() => router.back()} className="w-full bg-blue-600 hover:bg-blue-700">
                    Go Back
                </Button>
            </div>
        </div>
    )
}

export default PostDetails
