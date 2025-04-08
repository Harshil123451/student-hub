'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';

export default function QuestionDetailPage({ params }) {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        // Fetch question
        const { data: questionData, error: questionError } = await supabase
          .from('questions')
          .select(`
            id,
            title,
            body,
            created_at
          `)
          .eq('id', params.id)
          .single();

        if (questionError) throw questionError;

        // Fetch answers
        const { data: answersData, error: answersError } = await supabase
          .from('answers')
          .select(`
            id,
            body,
            created_at
          `)
          .eq('question_id', params.id)
          .order('created_at', { ascending: true });

        if (answersError) throw answersError;

        setQuestion(questionData);
        setAnswers(answersData || []);
      } catch (error) {
        console.error('Error fetching question:', error);
        setError('Failed to load question. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [params.id]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('answers')
        .insert([
          {
            body: newAnswer,
            question_id: params.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setAnswers([...answers, data]);
      setNewAnswer('');
    } catch (error) {
      console.error('Error posting answer:', error);
      alert('Failed to post answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <Link
                href="/forum"
                className="mt-2 inline-block text-sm text-red-700 hover:text-red-600 font-medium"
              >
                ← Back to Questions
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Question not found</h1>
          <p className="mt-2 text-gray-600">The question you're looking for doesn't exist.</p>
          <Link
            href="/forum"
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/forum"
          className="text-indigo-600 hover:text-indigo-500 flex items-center mb-4"
        >
          <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Questions
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
        <p className="text-gray-600 mb-4 whitespace-pre-wrap">{question.body}</p>
        <div className="text-sm text-gray-500">
          Posted on {new Date(question.created_at).toLocaleDateString()}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
        </h2>
        
        {answers.length > 0 ? (
          <div className="space-y-6">
            {answers.map((answer) => (
              <div key={answer.id} className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600 whitespace-pre-wrap">{answer.body}</p>
                <div className="mt-2 text-sm text-gray-500">
                  Posted on {new Date(answer.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No answers yet. Be the first to answer!</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Answer</h3>
        <form onSubmit={handleSubmitAnswer} className="space-y-4">
          <div>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Write your answer here..."
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {submitting ? 'Posting...' : 'Post Answer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}