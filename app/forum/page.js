'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function ForumPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Simplified query without profiles join
        const { data, error } = await supabase
          .from('questions')
          .select(`
            id,
            title,
            body,
            created_at
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching questions:', error);
          throw error;
        }

        console.log('Fetched questions:', data); // Debug log
        setQuestions(data || []);
      } catch (error) {
        console.error('Error in fetchQuestions:', error);
        setError(error.message || 'Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Q&A</h1>
        <Link
          href="/forum/ask"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ask a Question
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error Loading Questions</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm text-red-700 hover:text-red-600 font-medium"
              >
                Try Again →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.id} className="bg-white p-4 rounded-lg shadow">
                <Link href={`/forum/${question.id}`}>
                  <h2 className="text-xl font-semibold text-indigo-600 hover:text-indigo-500">
                    {question.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mt-2 line-clamp-2">{question.body}</p>
                <div className="mt-2 text-sm text-gray-500">
                  Posted on {new Date(question.created_at).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900">No questions yet</h3>
              <p className="mt-1 text-gray-500">Be the first to ask a question!</p>
              <Link
                href="/forum/ask"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Ask a Question
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 