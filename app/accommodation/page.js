'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuburb, setSelectedSuburb] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedType, setSelectedType] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  
  // Get unique suburbs for filter
  const [suburbs, setSuburbs] = useState([]);
  
  // Room types for filter
  const roomTypes = ['Studio', '1 Bedroom', '2 Bedrooms', '3+ Bedrooms', 'Shared Room'];
  
  // Availability options
  const availabilityOptions = ['Available Now', 'Available Next Month', 'Available in 2+ Months'];

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;

      setAccommodations(data);
      
      // Extract unique suburbs
      const uniqueSuburbs = [...new Set(data.map(item => item.location))];
      setSuburbs(uniqueSuburbs);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter accommodations based on all criteria
  const filteredAccommodations = accommodations.filter(acc => {
    const matchesSearch = acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         acc.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSuburb = !selectedSuburb || acc.location === selectedSuburb;
    
    const matchesPriceRange = (!priceRange.min || acc.price >= Number(priceRange.min)) &&
                            (!priceRange.max || acc.price <= Number(priceRange.max));
    
    const matchesType = !selectedType || acc.type === selectedType;
    
    const matchesAvailability = !selectedAvailability || acc.availability === selectedAvailability;
    
    return matchesSearch && matchesSuburb && matchesPriceRange && matchesType && matchesAvailability;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSuburb('');
    setPriceRange({ min: '', max: '' });
    setSelectedType('');
    setSelectedAvailability('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage 
            message={error}
            onRetry={fetchAccommodations}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Accommodation Listings</h1>
          <Link
            href="/accommodation/submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit New Listing
          </Link>
        </div>

        {/* Filters Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search listings..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Suburb Filter */}
            <div>
              <label htmlFor="suburb" className="block text-sm font-medium text-gray-700">Suburb</label>
              <select
                id="suburb"
                value={selectedSuburb}
                onChange={(e) => setSelectedSuburb(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Suburbs</option>
                {suburbs.map((suburb) => (
                  <option key={suburb} value={suburb}>{suburb}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <div className="mt-1 flex space-x-2">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  placeholder="Min"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  placeholder="Max"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Room Type</label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Types</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
              <select
                id="availability"
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Any Time</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery || selectedSuburb || priceRange.min || priceRange.max || selectedType || selectedAvailability) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Showing {filteredAccommodations.length} of {accommodations.length} listings
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAccommodations.map((accommodation) => (
            <Link
              key={accommodation.id}
              href={`/accommodation/${accommodation.id}`}
              className="block hover:shadow-lg transition-shadow duration-200"
            >
              <div className="bg-white overflow-hidden shadow rounded-lg">
                {accommodation.image_url && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={accommodation.image_url}
                      alt={accommodation.title}
                      className="object-cover w-full h-48"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{accommodation.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{accommodation.location}</p>
                  <p className="mt-2 text-lg font-semibold text-indigo-600">
                    ${accommodation.price}/week
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {accommodation.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {accommodation.availability || 'Contact for availability'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredAccommodations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No accommodations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 