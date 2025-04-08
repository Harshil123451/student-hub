'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function Roommates() {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredRoommates, setFilteredRoommates] = useState([]);

  const availableTags = [
    { id: 'quiet', label: 'Quiet', icon: '🤫' },
    { id: 'pet-friendly', label: 'Pet Friendly', icon: '🐾' },
    { id: 'same-uni', label: 'Same Uni', icon: '🎓' },
    { id: 'international', label: 'International', icon: '🌏' },
    { id: 'smoke-free', label: 'Smoke Free', icon: '🚭' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥗' }
  ];

  useEffect(() => {
    const fetchRoommates = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('roommates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setRoommates(data || []);
        setFilteredRoommates(data || []);
      } catch (error) {
        console.error('Error fetching roommates:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoommates();
  }, []);

  useEffect(() => {
    let filtered = [...roommates];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(roommate => 
        roommate.name.toLowerCase().includes(query) ||
        roommate.suburb.toLowerCase().includes(query) ||
        roommate.bio.toLowerCase().includes(query)
      );
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(roommate =>
        selectedTags.every(tag => roommate.tags.includes(tag))
      );
    }

    setFilteredRoommates(filtered);
  }, [searchQuery, selectedTags, roommates]);

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(tag => tag !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Roommate</h1>
          <p className="mt-2 text-gray-600">Connect with other students looking for housing in Melbourne</p>
        </div>

        <div className="bg-white shadow sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label htmlFor="search" className="sr-only">Search roommates</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search by name, suburb, or bio..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                      selectedTags.includes(tag.id)
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                        : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{tag.icon}</span>
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {(searchQuery || selectedTags.length > 0) && (
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing {filteredRoommates.length} results
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRoommates.map(roommate => (
            <div
              key={roommate.id}
              className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
            >
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={roommate.image_url || 'https://via.placeholder.com/150'}
                      alt={roommate.name}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{roommate.name}</h3>
                    <p className="text-sm text-gray-500">{roommate.suburb}</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <p className="text-sm text-gray-500 mb-4">{roommate.bio}</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-900">Rent Range:</span>{' '}
                    <span className="text-gray-500">{roommate.rent_range}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-900">Room Type:</span>{' '}
                    <span className="text-gray-500">{roommate.room_type}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-900">Availability:</span>{' '}
                    <span className="text-gray-500">{roommate.availability}</span>
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {roommate.tags.map(tagId => {
                    const tag = availableTags.find(t => t.id === tagId);
                    return tag ? (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <span className="mr-1">{tag.icon}</span>
                        {tag.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6">
                <div className="text-sm text-gray-500">
                  <p>Contact: {roommate.contact_email}</p>
                  {roommate.contact_phone && (
                    <p>Phone: {roommate.contact_phone}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRoommates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No roommate requests found.</p>
            <Link
              href="/roommates/submit"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Post a Request
            </Link>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/roommates/submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Post a Roommate Request
          </Link>
        </div>
      </div>
    </div>
  );
} 