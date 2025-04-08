'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function SubmitTip() {
  const [formData, setFormData] = useState({
    tip: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const categories = ['Transport', 'Food', 'Study'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('student_tips')
        .insert([{
          ...formData,
          approved: false
        }]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        tip: '',
        category: ''
      });
    } catch (error) {
      console.error('Error submitting tip:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submit a Student Tip</h1>
          <p className="mt-2 text-gray-600">Share your knowledge to help other students</p>
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
                    Thank you! Your tip has been submitted and will be reviewed by our moderators.
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
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="tip" className="block text-sm font-medium text-gray-700">
                Your Tip *
              </label>
              <div className="mt-1">
                <textarea
                  id="tip"
                  name="tip"
                  rows="4"
                  required
                  value={formData.tip}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Share your helpful tip for other students..."
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Be specific and clear. Your tip will help other students navigate city life better.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : 'Submit Tip'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <Link
              href="/city-tips"
              className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center justify-center"
            >
              ← Back to Tips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 