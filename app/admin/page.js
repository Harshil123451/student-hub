'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import ErrorBoundary from '../components/ErrorBoundary';
import { handleSupabaseError } from '../utils/errorHandler';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminDashboard() {
  const [pendingTips, setPendingTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (!session) {
          router.push('/login');
          return;
        }

        // Fetch pending tips
        await fetchPendingTips();
      } catch (error) {
        const { error: errorMessage } = handleSupabaseError(error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetchPendingTips = async () => {
    try {
      const { data, error } = await supabase
        .from('tips')
        .select('*')
        .eq('status', 'pending');

      if (error) throw error;
      setPendingTips(data || []);
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      setError(errorMessage);
    }
  };

  const handleApprove = async (tipId) => {
    try {
      const { error } = await supabase
        .from('tips')
        .update({ status: 'approved' })
        .eq('id', tipId);

      if (error) throw error;

      setSuccess('Tip approved successfully');
      await fetchPendingTips();
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      setError(errorMessage);
    }
  };

  const handleReject = async (tipId) => {
    try {
      const { error } = await supabase
        .from('tips')
        .update({ status: 'rejected' })
        .eq('id', tipId);

      if (error) throw error;

      setSuccess('Tip rejected successfully');
      await fetchPendingTips();
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      setError(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      setError(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Create User
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-600">Manage pending student tips</p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4 mb-6">
              <p className="text-sm font-medium text-green-800">{success}</p>
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {pendingTips.map((tip) => (
                <li key={tip.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {tip.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <button
                          onClick={() => handleApprove(tip.id)}
                          className="px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(tip.id)}
                          className="ml-2 px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
} 