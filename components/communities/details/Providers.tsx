'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ProviderCard } from './ProviderCard';

interface Provider {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  phone?: string;
  website?: string;
}

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Supermarket Plus',
    category: 'Grocery Store',
    image: 'https://images.unsplash.com/photo-1578365746325-3d3b5b0e2a2a?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 234,
    location: 'New York, NY',
    phone: '(555) 123-4567',
    website: 'supermarketplus.com',
  },
  {
    id: '2',
    name: 'Latin Restaurant',
    category: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561a1f?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 456,
    location: 'New York, NY',
    phone: '(555) 234-5678',
    website: 'latinrestaurant.com',
  },
  {
    id: '3',
    name: 'Translation Services',
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 189,
    location: 'Remote',
    phone: '(555) 345-6789',
  },
  {
    id: '4',
    name: 'Immigration Law Firm',
    category: 'Legal Services',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 312,
    location: 'New York, NY',
    phone: '(555) 456-7890',
    website: 'immigrationlaw.com',
  },
  {
    id: '5',
    name: 'Spanish Tutoring',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 145,
    location: 'Remote',
    phone: '(555) 567-8901',
  },
  {
    id: '6',
    name: 'Healthcare Clinic',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 278,
    location: 'New York, NY',
    phone: '(555) 678-9012',
    website: 'healthcareclinic.com',
  },
];

const categories = [
  'All',
  'Grocery Store',
  'Restaurant',
  'Services',
  'Legal Services',
  'Education',
  'Healthcare',
];

export default function Providers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProviders = mockProviders.filter(
    (provider) =>
      (selectedCategory === 'All' || provider.category === selectedCategory) &&
      (provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Community Providers</h1>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search providers by name or category..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            {...provider}
            onContact={() => console.log('Contact:', provider.name)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No providers found matching your search.</p>
        </div>
      )}
    </div>
  );
}

