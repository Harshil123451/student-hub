'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { fetchRestaurants } from '../../../lib/foursquareApi';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Foursquare API key
const FOURSQUARE_API_KEY = 'fsq3uEYlpdJuYZqnHI++vYR3vC7c0WGm/ALKkxo83HsEna8=';

// Placeholder image as a data URL
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a5c0c3c5c%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2Cmonospace%2C%26quot%3BSegoe%20UI%20Mono%26quot%3B%2C%26quot%3BRoboto%20Mono%26quot%3B%2C%26quot%3BMonaco%26quot%3B%2C%26quot%3BCourier%20New%26quot%3B%2Cmonospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a5c0c3c5c%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22147.5%22%20y%3D%22158.5%22%3ERestaurant%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Clayton');
  const [debouncedLocation, setDebouncedLocation] = useState('Clayton');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Common cuisines for filter
  const cuisineTypes = [
    'Asian', 'Italian', 'Indian', 'Chinese', 'Japanese', 
    'Thai', 'Vietnamese', 'Mexican', 'American', 'Cafe'
  ];

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Showing default Melbourne restaurants.');
          // Default to Melbourne CBD coordinates
          setUserLocation({ lat: -37.8136, lng: 144.9631 });
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Showing default Melbourne restaurants.');
      // Default to Melbourne CBD coordinates
      setUserLocation({ lat: -37.8136, lng: 144.9631 });
    }
  }, []);

  // Debounce location changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedLocation(location);
    }, 1000); // Wait for 1 second after typing stops

    return () => clearTimeout(timeoutId);
  }, [location]);

  // Only fetch when debouncedLocation changes
  useEffect(() => {
    loadRestaurants();
  }, [debouncedLocation]);

  const loadRestaurants = async () => {
    if (!debouncedLocation) return; // Don't fetch if location is empty
    
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRestaurants(debouncedLocation, 50);
      setRestaurants(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter restaurants based on search query and cuisine type
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = !selectedCuisine || 
      (restaurant.categories && 
       restaurant.categories.some(cat => 
         cat.name.toLowerCase().includes(selectedCuisine.toLowerCase())
       ));
    return matchesSearch && matchesCuisine;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('');
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
            onRetry={loadRestaurants}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Restaurants in Melbourne
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Discover great places to eat near you
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search Restaurants
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Location with typing indicator */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter suburb..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {location !== debouncedLocation && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    Typing...
                  </span>
                )}
              </div>
            </div>

            {/* Cuisine Filter */}
            <div>
              <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                Cuisine Type
              </label>
              <select
                id="cuisine"
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Cuisines</option>
                {cuisineTypes.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCuisine) && (
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
            Found {filteredRestaurants.length} restaurants
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.fsq_id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              {restaurant.photos && restaurant.photos[0] && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={`${restaurant.photos[0].prefix}original${restaurant.photos[0].suffix}`}
                    alt={restaurant.name}
                    className="object-cover w-full h-48"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{restaurant.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{restaurant.location.formatted_address}</p>
                
                {/* Categories/Cuisine Types */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {restaurant.categories?.map(category => (
                    <span
                      key={category.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                {restaurant.rating && (
                  <div className="mt-4 flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {restaurant.rating}/10
                    </span>
                  </div>
                )}

                {/* Price Level */}
                {restaurant.price && (
                  <div className="mt-2 text-sm text-gray-500">
                    {'$'.repeat(restaurant.price)}
                  </div>
                )}

                {/* Hours */}
                {restaurant.hours?.display && (
                  <p className="mt-2 text-sm text-gray-500">
                    {restaurant.hours.display}
                  </p>
                )}

                {/* View More Link */}
                <a
                  href={`https://foursquare.com/v/${restaurant.fsq_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No restaurants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 