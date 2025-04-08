'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SubmitRoommateRequest() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    suburb: '',
    bio: '',
    rent_range: '',
    room_type: '',
    availability: '',
    tags: [],
    contact_email: '',
    contact_phone: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const roomTypes = [
    'Private Room',
    'Shared Room',
    'Studio',
    'Entire Apartment'
  ];

  const availableTags = [
    { id: 'quiet', label: 'Quiet', icon: '🤫' },
    { id: 'pet-friendly', label: 'Pet Friendly', icon: '🐾' },
    { id: 'same-uni', label: 'Same Uni', icon: '🎓' },
    { id: 'international', label: 'International', icon: '🌏' },
    { id: 'smoke-free', label: 'Smoke Free', icon: '🚭' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥗' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagToggle = (tagId) => {
    setFormData(prev => {
      const tags = [...prev.tags];
      if (tags.includes(tagId)) {
        return {
          ...prev,
          tags: tags.filter(tag => tag !== tagId)
        };
      } else {
        return {
          ...prev,
          tags: [...tags, tagId]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase
        .from('roommates')
        .insert([
          {
            ...formData,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setSuccess(true);
      setFormData({
        name: '',
        suburb: '',
        bio: '',
        rent_range: '',
        room_type: '',
        availability: '',
        tags: [],
        contact_email: '',
        contact_phone: '',
        image_url: ''
      });
    } catch (error) {
      console.error('Error submitting roommate request:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a Roommate Request</h1>
          <p className="mt-2 text-gray-600">Find your perfect roommate match</p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {success ? (
            <div className="rounded-md bg-green-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Your roommate request has been posted successfully!
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name *
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Alex Chen"
                />
              </div>
            </div>

            <div>
              <label htmlFor="suburb" className="block text-sm font-medium text-gray-700">
                Suburb *
              </label>
              <div className="mt-1">
                <input
                  id="suburb"
                  name="suburb"
                  type="text"
                  required
                  value={formData.suburb}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Clayton"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio *
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  required
                  value={formData.bio}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Tell potential roommates about yourself, your lifestyle, and what you're looking for..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="rent_range" className="block text-sm font-medium text-gray-700">
                  Rent Range (£/week) *
                </label>
                <div className="mt-1">
                  <input
                    id="rent_range"
                    name="rent_range"
                    type="text"
                    required
                    value={formData.rent_range}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., £150-£200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="room_type" className="block text-sm font-medium text-gray-700">
                  Room Type *
                </label>
                <div className="mt-1">
                  <select
                    id="room_type"
                    name="room_type"
                    required
                    value={formData.room_type}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a room type</option>
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability *
              </label>
              <div className="mt-1">
                <input
                  id="availability"
                  name="availability"
                  type="text"
                  required
                  value={formData.availability}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Available from June 1st"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                      formData.tags.includes(tag.id)
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

            <div>
              <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                Contact Email *
              </label>
              <div className="mt-1">
                <input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  required
                  value={formData.contact_email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., alex@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
                Contact Phone (optional)
              </label>
              <div className="mt-1">
                <input
                  id="contact_phone"
                  name="contact_phone"
                  type="tel"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., +44 123 456 7890"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                Profile Image URL (optional)
              </label>
              <div className="mt-1">
                <input
                  id="image_url"
                  name="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/roommates"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Back to Roommate Listings
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 