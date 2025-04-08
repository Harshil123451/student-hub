'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AccommodationDetails() {
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchAccommodation() {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        setAccommodation(data);
      } catch (error) {
        setError('Error fetching accommodation details');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAccommodation();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading accommodation details...</p>
        </div>
      </div>
    );
  }

  if (error || !accommodation) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error || 'Accommodation not found'}</p>
          </div>
          <Link
            href="/accommodation"
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-900"
          >
            ← Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{accommodation.title}</h1>
              <p className="mt-1 text-sm text-gray-500">{accommodation.location}</p>
            </div>
            <span className="px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
              {accommodation.type}
            </span>
          </div>
        </div>

        {accommodation.image_url ? (
          <div className="w-full h-96 relative">
            <img
              src={accommodation.image_url}
              alt={accommodation.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/800x600?text=No+Image+Available';
              }}
            />
          </div>
        ) : (
          <div className="w-full h-96 relative bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-lg">No image available</span>
          </div>
        )}

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{accommodation.description}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900">£{accommodation.price}/week</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">{accommodation.location}</dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Contact Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{accommodation.contact_name}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Contact Email</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a href={`mailto:${accommodation.contact_email}`} className="text-indigo-600 hover:text-indigo-900">
                  {accommodation.contact_email}
                </a>
              </dd>
            </div>

            {accommodation.contact_phone && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Contact Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a href={`tel:${accommodation.contact_phone}`} className="text-indigo-600 hover:text-indigo-900">
                    {accommodation.contact_phone}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
          <Link
            href="/accommodation"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            ← Back to Listings
          </Link>
        </div>
      </div>
    </div>
  );
} 