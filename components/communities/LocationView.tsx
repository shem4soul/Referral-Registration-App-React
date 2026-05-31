'use client';


import { ChevronLeft, MapPin, TrendingUp } from "lucide-react";
import { mockLocationView } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function LocationViewPage() {
  const router = useRouter();
  const location = mockLocationView;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => router.push("/communities")}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Views</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Location Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6">
          <img
            src={location.image}
            alt={location.name}
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Service Provider"
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Stats Tabs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-6 mb-6 border-b">
            <button className="pb-3 font-semibold text-blue-600 border-b-2 border-blue-600">
              Community
            </button>
            <button className="pb-3 font-semibold text-gray-600 hover:text-gray-900">
              Connection
            </button>
            <button className="pb-3 font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Trends
            </button>
          </div>

          {/* Stats Grid */}
          <div className="space-y-4">
            {location.communities.map((community, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <span className="font-semibold text-gray-900">{community.name}</span>
                <span className="text-gray-600">{community.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}

