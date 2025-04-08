'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import TestConnection from './test-connection';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Add console logs to debug
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default function TipsPage() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    async function fetchTips() {
      try {
        setLoading(true);
        
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Missing Supabase credentials. Please check your environment variables.');
        }
        
        // Fetch tips from Supabase
        let query = supabase
          .from('student_tips')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false });
        
        // Apply category filter if selected
        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }
        
        console.log('Executing Supabase query...');
        const { data, error } = await query;
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Fetched tips:', data);
        setTips(data || []);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(tip => tip.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching tips:', err);
        setError(err.message || 'Failed to load tips. Please try again later.');
        setConnectionError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchTips();
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Student Tips
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Helpful advice from fellow students to enhance your university experience
        </p>
      </div>

      {/* Connection Test */}
      {connectionError && <TestConnection />}

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All Tips
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tips Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tips.length > 0 ? (
            tips.map((tip) => (
              <div key={tip.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{tip.title}</h3>
                    {tip.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {tip.category}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500">{tip.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    {new Date(tip.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tips found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedCategory === 'all' 
                  ? "There are no tips available yet. Check back later!" 
                  : `There are no tips in the "${selectedCategory}" category.`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 