'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Phone, Globe } from 'lucide-react';

interface ProviderCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  phone?: string;
  website?: string;
  onContact?: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  name,
  category,
  image,
  rating,
  reviews,
  location,
  phone,
  website,
  onContact,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="h-40 bg-gray-200 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-xs text-blue-600 font-medium">{category}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviews})</span>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          {phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>{phone}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="truncate text-blue-600">{website}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onContact}
        >
          Contact
        </Button>
      </div>
    </div>
  );
};

