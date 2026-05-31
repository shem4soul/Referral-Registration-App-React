import React, { useEffect, useState } from "react";
import {
  currentUser,
  initialCommunities,
  initialEvents,
  initialJobs,
} from "@/lib/helper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Calendar,
  Eye,
  EyeOff,
  FileText,
  Heart,
  MapPin,
  Send,
  ShoppingBag,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import clientApi from "@/apis/clientApi";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "@/redux/userSlice";
import Link from "next/link";
import { useGetProfile, useGetUserWalletBalance } from "@/apis/auth";
import { useGetAllCommunities } from "@/apis/communityMutation";
import { useJoinCommunityMutation } from '@/apis/communityMutation';
import { formatCurrency } from "@/lib/utils";

const RightSidebar = () => {
  const [communities, setCommunities] = useState(initialCommunities);
  const [showBalance, setShowBalance] = useState(true);
  const { data, isLoading } = useGetProfile();
  const { data: realCommunities, isLoading: communitiesLoading } = useGetAllCommunities();
  const { mutateAsync: joinCommunity, isPending: joinPending } = useJoinCommunityMutation();
  const dispatch = useDispatch();

  const {
    data: walletData,
    isLoading: walletIsLoading,
    isError: walletIsError,
    error: walletError,
  } = useGetUserWalletBalance();

  console.log("Profile data:", data);
  console.log("Real communities:", realCommunities);

  useEffect(() => {
    if (data) {
      dispatch(setUser({ details: data.user }));
    }
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading, data]);

  const handleJoinCommunity = async (communityId: string) => {
    const payload = { community_id: communityId };
    try {
      await joinCommunity(payload);
      if (realCommunities) {
        setCommunities(prev =>
          prev.map(comm =>
            comm.id === communityId
              ? { ...comm, isMember: 1, members: comm.members + 1 }
              : comm
          )
        );
      }
    } catch (error) {
      console.error('Error joining community:', error);
    }
  };

  const displayCommunities = realCommunities ? realCommunities.slice(0, 3) : communities.slice(0, 3);

  // Check if wallet is missing (account not found)
  const isWalletMissing = walletIsError && walletError?.response?.data?.message === "Account not found";

  return (
    <div>
      <div className="hidden sticky top-0 lg:block space-y-4">
        {/* Balance Card with loading and error states */}
        {walletIsLoading ? (
          // Loading skeleton for wallet
          <Card className="bg-gradient-to-br from-blue-600 to-primary/80 text-primary-foreground">
            <CardHeader>
              <Skeleton className="h-5 w-20 bg-white/20" />
              <Skeleton className="h-4 w-32 bg-white/20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-36 mb-2 bg-white/20" />
              <Skeleton className="h-4 w-24 mb-4 bg-white/20" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-8 w-full bg-white/20" />
                <Skeleton className="h-8 w-full bg-white/20" />
              </div>
            </CardContent>
          </Card>
        ) : isWalletMissing ? (
          // No wallet found state
          <Card className="bg-gradient-to-br from-blue-600 to-primary/80 text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Wallet</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                You don&apos;t have a wallet yet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Create a wallet to start sending and receiving money.
              </p>
              <Link href="/n/wallet" className="w-full">
                <Button variant="secondary" size="sm" className="w-full">
                  <Wallet className="w-4 h-4 mr-2" />
                  Create Wallet
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          // Normal wallet display
          <Card className="bg-gradient-to-br from-blue-600 to-primary/80 text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Balance</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Ledger balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <h3 className="text-4xl font-bold">
                  {showBalance ? formatCurrency(walletData?.balance) : "••••••"}
                </h3>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <div className="text-sm text-primary-foreground/80 mb-4">
                +₦0.00 last 7 days
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link className="w-full" href="/n/wallet/outbound">
                  <Button className="w-full" variant="secondary" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Transfer
                  </Button>
                </Link>
                <Link className="w-full" href="/n/wallet/">
                  <Button className="w-full" variant="secondary" size="sm">
                    <Wallet className="w-4 h-4 mr-2" />
                    wallet
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trending Communities (unchanged) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending Communities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {communitiesLoading ? (
              [...Array(3)].map((_, index) => (
                <div key={`skeleton-${index}`} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-2 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
              ))
            ) : displayCommunities.length > 0 ? (
              <>
                {displayCommunities.map((community, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {community.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{community.name}</div>
                        <div className="text-xs text-muted-foreground">{community.members} members</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={community.isMember ? "outline" : "secondary"}
                      onClick={() => handleJoinCommunity(community.unique_id)}
                      disabled={joinPending}
                      className={`${
                        community.isMember
                          ? "bg-gray-100 text-black hover:bg-slate-100"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {joinPending ? "..." : community.isMember ? "Joined" : "Join"}
                    </Button>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-100">
                  <Link href="/n/communities">
                    <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      View all communities
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-muted-foreground text-sm">No communities found</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events (unchanged) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {initialEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="space-y-2 pb-3 border-b last:border-0 last:pb-0">
                <div className="font-medium text-sm line-clamp-2">{event.name}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </div>
                <Button size="sm" className="bg-blue-600 text-white py-3 w-full">
                  Get Ticket
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Benefits (unchanged) */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Platform Features</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Create and Share
              </h4>
              <p className="text-slate-600">
                Create beautiful posts with multiple images. Control who can see your content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Eye size={20} className="text-purple-600" />
                Track Engagement
              </h4>
              <p className="text-slate-600">
                See who viewed and liked your posts. Connect with engaged users.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <ShoppingBag size={20} className="text-green-600" />
                Marketplace
              </h4>
              <p className="text-slate-600">
                Browse products and list your own items for sale with detailed descriptions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Heart size={20} className="text-red-600" />
                Community
              </h4>
              <p className="text-slate-600">
                Connect with users, like posts, and build meaningful relationships.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RightSidebar;