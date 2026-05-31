'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  isAttending?: boolean;
  onAttend?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  image,
  date,
  time,
  location,
  attendees,
  isAttending = false,
  onAttend,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className={`w-5 h-5 ${isAttending ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{title}</h3>

        {/* Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{date} at {time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{attendees} attending</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className={`w-full ${isAttending ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          onClick={onAttend}
        >
          {isAttending ? 'Attending' : 'Attend Event'}
        </Button>
      </div>
    </div>
  );
};

