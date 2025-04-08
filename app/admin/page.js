'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { requireAdmin } from '../../lib/adminUtils';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [pendingTips, setPendingTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication and admin status
    async function checkAuth() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }
        
        try {
          requireAdmin(user.email);
          setUser(user);
          fetchPendingTips();
        } catch (adminError) {
          router.push('/login');
          return;
        }
      } catch (error) {
        router.push('/login');
      }
    }

    checkAuth();
  }, [router]);

  async function fetchPendingTips() {
    try {
      const { data, error } = await supabase
        .from('student_tips')
        .select('*')
        .eq('approved', false)
        .order('id');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched tips:', data);
      setPendingTips(data || []);
    } catch (error) {
      console.error('Error fetching pending tips:', error);
      setError('Failed to load tips. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function handleModeration(tipId, approve) {
    try {
      if (!user) throw new Error('Not authenticated');
      requireAdmin(user.email);

      if (approve) {
        // If approving, update the approved status
        const { error } = await supabase
          .from('student_tips')
          .update({ approved: true })
          .eq('id', tipId);

        if (error) throw error;
        setSuccess('Tip approved successfully!');
      } else {
        // If rejecting, delete the tip
        const { error } = await supabase
          .from('student_tips')
          .delete()
          .eq('id', tipId);

        if (error) throw error;
        setSuccess('Tip rejected and removed.');
      }

      // Clear error if any
      setError(null);

      // Refresh the list
      fetchPendingTips();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      console.error('Error moderating tip:', error);
      setError(error.message);
      setSuccess('');
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
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

        {pendingTips.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-600">No pending tips to moderate! 🎉</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingTips.map((tip) => (
              <div key={tip.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded">
                        {tip.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ID: {tip.id}
                      </span>
                    </div>
                    <p className="mt-3 text-gray-900">{tip.tip}</p>
                  </div>
                  <div className="ml-6 flex space-x-3">
                    <button
                      onClick={() => handleModeration(tip.id, true)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleModeration(tip.id, false)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 