'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BingoSubmissionForm() {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/bingo/tiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          authorName: authorName || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit tile');
      }

      // Reset form and show success message
      setContent('');
      setAuthorName('');
      router.refresh();
    } catch (err) {
      setError('Failed to submit tile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Submit Your Bingo Tile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Tile Content (max 100 characters)
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={100}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            placeholder="Enter your Melbourne student life experience..."
          />
          <p className="text-sm text-gray-500 mt-1">{100 - content.length} characters remaining</p>
        </div>

        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name (optional)
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Anonymous"
            maxLength={50}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Tile'}
        </button>
      </form>
    </div>
  );
} 