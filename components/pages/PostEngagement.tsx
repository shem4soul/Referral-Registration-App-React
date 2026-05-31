'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { trpc } from "@/lib/trpc";
import { Search, Eye, Heart, UserPlus, UserCheck } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useLocation } from "wouter";

type EngagementType = "views" | "likes";

interface EngagementUser {
  id: string;
  name: string;
  email: string;
  isConnected: boolean;
}

export default function PostEngagement() {
    
      const searchParams = useSearchParams();
      const router = useRouter();
      // Extract the values
      const id = searchParams.get("id");
      const type = searchParams.get("type");
//   const { user } = useAuth();
  const [engagementType, setEngagementType] = useState<EngagementType | string>(type || "likes");
  const [searchQuery, setSearchQuery] = useState("");
  const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set());
  // Mock data - in real app, this would come from URL params
//   const postId = "mock-post-id";

  // Mock engagement data
  const mockEngagementData: Record<EngagementType, EngagementUser[]> = {
    likes: [
      { id: "1", name: "John Doe", email: "john@example.com", isConnected: false },
      { id: "2", name: "Jane Smith", email: "jane@example.com", isConnected: true },
      { id: "3", name: "Mike Johnson", email: "mike@example.com", isConnected: false },
      { id: "4", name: "Sarah Williams", email: "sarah@example.com", isConnected: true },
      { id: "5", name: "Tom Brown", email: "tom@example.com", isConnected: false },
      { id: "6", name: "Emily Davis", email: "emily@example.com", isConnected: false },
      { id: "7", name: "David Miller", email: "david@example.com", isConnected: true },
      { id: "8", name: "Lisa Anderson", email: "lisa@example.com", isConnected: false },
      { id: "9", name: "Chris Taylor", email: "chris@example.com", isConnected: true },
      { id: "10", name: "Jennifer White", email: "jennifer@example.com", isConnected: false },
    ],
    views: [
      { id: "1", name: "John Doe", email: "john@example.com", isConnected: false },
      { id: "2", name: "Jane Smith", email: "jane@example.com", isConnected: true },
      { id: "3", name: "Mike Johnson", email: "mike@example.com", isConnected: false },
      { id: "4", name: "Sarah Williams", email: "sarah@example.com", isConnected: true },
      { id: "5", name: "Tom Brown", email: "tom@example.com", isConnected: false },
    ],
  };

  const engagementData = mockEngagementData[engagementType as EngagementType];
  const filteredUsers = engagementData?.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleConnect = (userId: string) => {
    const newConnected = new Set(connectedUsers);
    if (newConnected.has(userId)) {
      newConnected.delete(userId);
    } else {
      newConnected.add(userId);
    }
    setConnectedUsers(newConnected);
  };

  const engagementStats = {
    likes: 345,
    views: 45,
  };

  return (
    <div className="min-h-screen w-full rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-slate-600 hover:text-slate-900 flex items-center gap-2 mb-4 transition-colors"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            {engagementType === "likes" ? "Likes" : "Views"}
          </h1>
          <p className="text-slate-600 mt-2">
            {engagementStats[engagementType as EngagementType]} {engagementType} on your post
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => {
              setEngagementType("likes");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              engagementType === "likes"
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
            }`}
          >
            <Heart size={20} />
            <span>Liked by ({engagementStats.likes})</span>
          </button>
          <button
            onClick={() => {
              setEngagementType("views");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              engagementType === "views"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
            }`}
          >
            <Eye size={20} />
            <span>Viewed by ({engagementStats.views})</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <Input
            type="text"
            placeholder="Search users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Users List */}
        <div className="space-y-2">
          {filteredUsers.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No users found</p>
            </Card>
          ) : (
            filteredUsers.map((u) => (
              <Card
                key={u.id}
                className={`p-4 hover:shadow-md transition-shadow cursor-pointer border ${
                  connectedUsers.has(u.id) ? "border-blue-200 bg-blue-50" : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {u.name.charAt(0)}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{u.name}</p>
                      <p className="text-sm text-slate-500 truncate">{u.email}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleConnect(u.id)}
                    className={`ml-4 flex-shrink-0 font-semibold transition-all ${
                      connectedUsers.has(u.id)
                        ? "bg-teal-500 hover:bg-teal-600 text-white"
                        : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {connectedUsers.has(u.id) ? (
                        <>
                          <UserCheck size={16} />
                          Connected
                        </>
                      ) : (
                        <>
                          <UserPlus size={16} />
                          Connect
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Stats Summary */}
        {filteredUsers.length > 0 && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{engagementStats[engagementType as EngagementType]}</p>
                <p className="text-sm text-slate-600">Total {engagementType}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-600">{connectedUsers.size}</p>
                <p className="text-sm text-slate-600">Connected</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {engagementStats[engagementType as EngagementType] - connectedUsers.size}
                </p>
                <p className="text-sm text-slate-600">Not connected</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

