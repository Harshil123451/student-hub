'use client';

import { useState, useEffect } from 'react';
import { fetchRestaurants } from '../lib/foursquareApi';
import RestaurantCard from './RestaurantCard';
import RestaurantSearch from './RestaurantSearch';

export default function RestaurantsSection({ initialLocation = 'Clayton', limit = 10 }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  const [hasSearched, setHasSearched] = useState(false);

  const loadRestaurants = async (location) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRestaurants(location, limit);
      setRestaurants(data);
      setCurrentLocation(location);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to load restaurants. Please try again later.');
      console.error('Error loading restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    loadRestaurants(initialLocation);
  }, [initialLocation, limit]);

  const handleSearch = async (location) => {
    await loadRestaurants(location);
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Restaurants</h2>
        
        <RestaurantSearch onSearch={handleSearch} />
        
        {hasSearched && (
          <p className="text-sm text-gray-500 mb-4">
            Showing restaurants near <span className="font-medium">{currentLocation}</span>
          </p>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No restaurants found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try searching for a different location.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.fsq_id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 