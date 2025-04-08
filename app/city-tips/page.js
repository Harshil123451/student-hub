'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function CityTips() {
  const [tips, setTips] = useState({
    Transport: [],
    Food: [],
    Study: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTips() {
      try {
        const { data, error } = await supabase
          .from('student_tips')
          .select('*')
          .order('id');

        if (error) throw error;

        // Group tips by category
        const groupedTips = data.reduce((acc, tip) => {
          if (!acc[tip.category]) {
            acc[tip.category] = [];
          }
          acc[tip.category].push(tip);
          return acc;
        }, {});

        setTips(groupedTips);
      } catch (error) {
        console.error('Error fetching tips:', error);
        setError('Failed to load tips. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTips();
  }, []);

  // Category icons mapping
  const categoryIcons = {
    Transport: '🚍',
    Food: '🍜',
    Study: '📖'
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {[1, 2, 3].map((section) => (
        <div key={section} className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // Error component
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🎓 Student Tips</h1>
          <p className="text-xl text-gray-600 mb-6">Your guide to making the most of student life in the city</p>
          <Link
            href="/city-tips/submit"
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition"
          >
            Submit a Tip
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {Object.keys(tips).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No tips available yet!</p>
              </div>
            ) : (
              Object.entries(tips).map(([category, categoryTips]) => (
                <section key={category} className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-4">
                    <span className="mr-2">{categoryIcons[category] || '📌'}</span>
                    {category === 'Food' ? 'Food & Budget Eats' : `${category} Tips`}
                  </h2>
                  {categoryTips.length === 0 ? (
                    <p className="text-gray-600">No tips available for this category.</p>
                  ) : (
                    <ul className="space-y-3 text-gray-600">
                      {categoryTips.map((tip) => (
                        <li key={tip.id} className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          {tip.tip}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))
            )}

            {/* Footer Note */}
            <div className="text-center text-gray-500 text-sm mt-12">
              <p>Tips are regularly updated based on student feedback</p>
              <p className="mt-2">Have a suggestion? Contact the student union!</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 