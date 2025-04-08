'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function TestConnection() {
  const [status, setStatus] = useState('Testing connection...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        console.log('Testing with URL:', supabaseUrl);
        console.log('Key exists:', !!supabaseKey);
        
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Missing Supabase credentials');
        }
        
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Try a simple query
        const { data, error } = await supabase
          .from('student_tips')
          .select('count')
          .limit(1);
        
        if (error) {
          throw error;
        }
        
        setStatus('Connection successful!');
      } catch (err) {
        console.error('Connection error:', err);
        setError(err.message);
        setStatus('Connection failed');
      }
    }
    
    testConnection();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium mb-2">Supabase Connection Test</h2>
      <p className="mb-2">Status: {status}</p>
      {error && (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
} 