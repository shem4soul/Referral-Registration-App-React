'use client';

import { useState } from "react";
import { ChevronLeft, Heart, Share2, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types/type-props";
import { mockProducts } from "@/lib/mockData";

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const data = mockProducts.find(product => product.id === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => router.push("/n/markets")}>Back to Marketplace</Button>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === data.images.length - 1 ? prev : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Marketplace</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {/* Image Carousel */}
        <div className="bg-white">
          <div className="relative aspect-square bg-gray-100 overflow-hidden">
            <img
              src={data.images[currentImageIndex]}
              alt={data.title}
              className="w-full h-full object-cover"
            />

            {/* Image Navigation */}
            {data.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                >
                  <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {data.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-6">
            {/* Title and Price */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Heart
                    className={`w-6 h-6 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ₦{data.price.toLocaleString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                size="lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with seller
              </Button>
              <Button
                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Zap className="w-5 h-5" />
                Pay
              </Button>
              <button className="p-3 hover:bg-gray-100 rounded-lg transition">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{data.description}</p>
            </div>

            {/* Seller Info */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Seller information</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={data.seller.avatar}
                    alt={data.seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{data.seller.name}</p>
                    <p className="text-sm text-gray-500">
                      {data.seller.connections.toLocaleString()}+ connection
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

