'use client';

import { Bell, Menu, MessageSquare, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";
import {
  currentUser,
  initialCommunities,
  initialJobs,
  initialMessages,
  initialNotifications,
  initialPosts,
} from "@/lib/helper";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/redux/selectors";
import { RePostType } from "@/types/type-props";
import UserDropdown from "../UserDropdown";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
    const details = useSelector(selectUserDetails);
    

  const unreadNotifications = initialNotifications.filter((n) => !n.read).length;
  const unreadMessages = initialMessages.reduce((sum, msg) => sum + msg.unread, 0);
  const searchData = [
    ...initialPosts.map((p) => ({ ...p, type: "post" })),
    ...initialCommunities.map((c) => ({ ...c, type: "community" })),
    ...initialJobs.map((j) => ({ ...j, type: "job" })),
  ];

//   useEffect(() => {
//     if (searchQuery.trim() === "") return;
//  handleSearch();
//   }, [searchQuery]);
  

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    router.push("/n/search?query=" + value);
  };
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              City
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            {/* <SearchBar
              placeholder="Search communities, posts, people..."
              data={searchData}
              onSearch={handleSearch}
            /> */}
          </div>

           <div className="relative mx-4 md:w-2/3 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-gray-100 border-0 rounded-full"
          />
        </div>

          <div className="flex items-center gap-4">
            <Link href="/n/notifications" className="relative">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
              )}
            </Link>
            <Link href="/n/messages" className="relative">
              <MessageSquare className="w-5 h-5" />
              {unreadMessages > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
              )}
            </Link>
            {/* <Avatar className="w-8 h-8 cursor-pointer">
               <AvatarImage src={details?.profilePicture?.media} />
              <AvatarFallback>{currentUser?.avatar}</AvatarFallback>
            </Avatar> */}
            <UserDropdown setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;