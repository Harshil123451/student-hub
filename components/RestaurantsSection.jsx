'use client';

import { useState, useEffect } from 'react';
import { fetchRestaurants } from '../lib/foursquareApi';
import RestaurantCard from './RestaurantCard';

export default function RestaurantsSection({ location = 'Clayton', limit = 10 }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRestaurants() {
      try {
        setLoading(true);
        const data = await fetchRestaurants(location, limit);
        setRestaurants(data);
        setError(null);
      } catch (err) {
        setError('Failed to load restaurants. Please try again later.');
        console.error('Error loading restaurants:', err);
      } finally {
        setLoading(false);
      }
    }

    loadRestaurants();
  }, [location, limit]);

  if (loading) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Restaurants</h2>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Restaurants</h2>
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Restaurants</h2>
          <p className="text-gray-500">No restaurants found in this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Restaurants</h2>
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.fsq_id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
} 