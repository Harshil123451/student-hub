'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  const accommodationTypes = [
    'Studio',
    'Apartment',
    'House Share',
    'Student Hall',
    'Private Hall',
    'Flat Share'
  ];

  const priceRanges = [
    { label: 'Under £100', value: '0-100' },
    { label: '£100 - £200', value: '100-200' },
    { label: '£200 - £300', value: '200-300' },
    { label: 'Over £300', value: '300+' }
  ];

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('price');

        if (error) throw error;
        setAccommodations(data);
        setFilteredAccommodations(data);
      } catch (error) {
        setError('Error fetching accommodations');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAccommodations();
  }, []);

  useEffect(() => {
    let filtered = [...accommodations];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(listing => 
        listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter(listing => listing.type === selectedType);
    }

    // Apply price range filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(listing => {
        if (max) {
          return listing.price >= min && listing.price < max;
        } else {
          return listing.price >= min;
        }
      });
    }

    setFilteredAccommodations(filtered);
  }, [searchQuery, selectedType, priceRange, accommodations]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setPriceRange('');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading accommodations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Student Accommodation</h1>
        <p className="mt-4 text-xl text-gray-600">
          Find your perfect student home
        </p>
        <div className="mt-6">
          <Link
            href="/accommodation/submit"
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition"
          >
            Submit a Listing
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search by Suburb
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., Carlton, CBD"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Types</option>
              {accommodationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (£/week)
            </label>
            <select
              id="price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Prices</option>
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchQuery || selectedType || priceRange) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredAccommodations.length} of {accommodations.length} listings
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredAccommodations.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {listing.image_url ? (
              <div className="h-48 w-full relative">
                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image+Available';
                  }}
                />
              </div>
            ) : (
              <div className="h-48 w-full relative bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{listing.title}</h2>
                <span className="px-2 py-1 text-sm bg-indigo-100 text-indigo-700 rounded">{listing.type}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-indigo-600 font-medium">£{listing.price}/week</span>
                <span className="text-gray-500">{listing.location}</span>
              </div>
              {listing.description && (
                <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>
              )}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Contact Information:</h3>
                <p className="text-sm text-gray-600">{listing.contact_name}</p>
                <p className="text-sm text-gray-600">{listing.contact_email}</p>
                <p className="text-sm text-gray-600">{listing.contact_phon}</p>
              </div>
              <Link
                href={`/accommodation/${listing.id}`}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition inline-block text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAccommodations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No accommodations found matching your criteria.</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Need help finding the right accommodation?</p>
        <Link 
          href="/city-tips" 
          className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition"
        >
          Check our City Tips
        </Link>
      </div>
    </div>
  );
} 