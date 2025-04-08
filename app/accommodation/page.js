'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const { data, error } = await supabase
          .from('accommodations')
          .select('*')
          .order('price');

        if (error) throw error;
        setAccommodations(data);
      } catch (error) {
        setError('Error fetching accommodations');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAccommodations();
  }, []);

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
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {accommodation.image_url && (
              <div className="h-48 w-full relative">
                <img
                  src={accommodation.image_url}
                  alt={accommodation.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{accommodation.title}</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-indigo-600 font-medium">£{accommodation.price}/week</span>
                <span className="text-gray-500">{accommodation.location}</span>
              </div>
              {accommodation.description && (
                <p className="text-gray-600 mb-4">{accommodation.description}</p>
              )}
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {accommodations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No accommodations found.</p>
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