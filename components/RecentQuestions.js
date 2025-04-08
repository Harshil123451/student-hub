'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function RecentQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select(`
            *,
            profiles:user_id (
              username
            )
          `)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching recent questions:', error);
        setError('Failed to load recent questions');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentQuestions();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="bg-white p-4 rounded-lg shadow">
            <Link href={`/forum/${question.id}`}>
              <h3 className="text-lg font-semibold text-indigo-600 hover:text-indigo-500">
                {question.title}
              </h3>
            </Link>
            <p className="text-gray-600 mt-1 line-clamp-2">{question.body}</p>
            <div className="mt-2 text-sm text-gray-500">
              Posted by {question.profiles?.username || 'Anonymous'} on{' '}
              {new Date(question.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link
          href="/forum"
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          View all questions →
        </Link>
      </div>
    </div>
  );
} 