"use client";

import React, { useEffect, useState } from "react";
import usePostHook from "@/hooks/use-post-hook";
import { PostCardSkeleton, PostCardSkeletonNoMedia } from "@/lib/skeleton";
import { PostCard } from "@/components/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserSearchMutation } from "@/apis/auth";
// import { useSearchPosts } from "@/apis/post";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // State for active tab
  const [activeTab, setActiveTab] = useState("users");

  // User search
  const { mutateAsync: searchUsers, isPending: isGettingUsers, data: availableUsers } = useUserSearchMutation();
   const {posts, handlePostLikes, handleRepost, isFetchingPosts} = usePostHook();

  // Post search – using a custom hook; adjust as per your API structure
//   const { mutateAsync: searchPosts, isPending: isSearchingPosts, data: searchedPosts } = useSearchPosts();

  // Trigger search when query changes
  useEffect(() => {
    if (query) {
      searchUsers(query);
    //   searchPosts(query); 
    }
//   }, [query, searchUsers, searchPosts]);
  }, [query, searchUsers]);

  const goToProfile = (userId: string) => {
    router.push(`/n/profile/details?id=${userId}`);
  };


//   const postsToShow = searchedPosts || [];

  return (
    <div className="px-3 sm:px-0">
      <div className="text flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold py-3 ">
          {/* Search Results {query ? `for "${query}"` : ""} */}
          Search Results
        </h2>
        <Button
          onClick={() => router.back()}
          className="text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-3 cursor-pointer"
        >
          Back
        </Button>
      </div>

      <Tabs defaultValue="users" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger className="cursor-pointer" value="users">Users</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="posts">Posts</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-6">
          {isGettingUsers ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b pb-4 animate-pulse">
                  <div className="h-14 w-14 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    <div className="h-3 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : availableUsers && availableUsers.length > 0 ? (
            <div className="space-y-6">
              {availableUsers.map((user) => (
                <div key={user.unique_id} className="flex items-center gap-4 border-b pb-4">
                  <div className="h-14">
                    <Avatar
                      onClick={() => goToProfile(user?.unique_id)}
                      className="w-14 h-14 flex-shrink-0 cursor-pointer"
                    >
                      <AvatarImage src={user?.profile_pic} alt={user?.first_name} />
                      <AvatarFallback>{user?.first_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 line-clamp-1">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <span className="text-gray-500 line-clamp-1">{user?.email}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-100 flex items-center justify-center">
              <p className="text-gray-400">No users found.</p>
            </div>
          )}
        </TabsContent>

        {/* Posts Tab */}
        <TabsContent value="posts" className="mt-6">
          {/* {isSearchingPosts ? (
            <div className="space-y-8">
              <PostCardSkeleton />
              <PostCardSkeletonNoMedia />
              <PostCardSkeleton />
              <PostCardSkeletonNoMedia />
            </div>
          ) : postsToShow.length > 0 ? (
            <div className="space-y-8">
              {postsToShow.map((post) => (
                <PostCard
                  key={post.unique_id}
                  post={post}
                  handleRepost={() => {}} 
                  handlePostLikes={() => {}} 
                />
              ))}
            </div>
          ) : (
            <div className="h-100 flex items-center justify-center">
              <p className="text-gray-400">No posts found.</p>
            </div>
          )} */}


          {isFetchingPosts ? (
            <div className="space-y-8">
              <PostCardSkeleton />
              <PostCardSkeletonNoMedia />
              <PostCardSkeleton />
              <PostCardSkeletonNoMedia />
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-8">
             {posts.map((post) => (
                         <PostCard key={post.unique_id} handleRepost={handleRepost} post={post} handlePostLikes={handlePostLikes} />
                       ))}
            </div>
          ) : (
            <div className="h-100 flex items-center justify-center">
              <p className="text-gray-400">No posts found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchPage;