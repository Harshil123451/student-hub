'use client';

import { useState } from 'react';

const initialStories = [
  "Today I accidentally called my professor 'mom' in class. The silence was deafening.",
  "I've been using the same pen for 3 semesters and it's still working. I'm emotionally attached now.",
  "Found out my crush sits behind me in lecture. Now I'm too nervous to turn around.",
  "Accidentally sent a meme to the class group chat instead of my friend. The professor replied with '😂'",
  "I keep a secret stash of snacks in my backpack for emergency study sessions.",
];

export default function Confessions({ mood }) {
  const [stories, setStories] = useState(initialStories);
  const [newStory, setNewStory] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newStory.trim()) {
      setStories([newStory, ...stories]);
      setNewStory('');
      setShowForm(false);
    }
  };

  return (
    <div className={`p-6 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-yellow/20' : 'bg-pastel-purple/20'
    }`}>
      <h2 className="text-2xl font-display mb-4">🤫 Confessions</h2>

      <div className="space-y-4 mb-6">
        {stories.slice(0, 3).map((story, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              mood === 'chill' ? 'bg-pastel-yellow/30' : 'bg-pastel-purple/30'
            }`}
          >
            <p className="text-sm">"{story}"</p>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            placeholder="Share your anonymous story..."
            className={`w-full p-3 rounded-lg mb-2 ${
              mood === 'chill' ? 'bg-pastel-yellow/30' : 'bg-pastel-purple/30'
            }`}
            rows={3}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded-full ${
                mood === 'chill' ? 'bg-pastel-yellow' : 'bg-pastel-purple'
              }`}
            >
              Submit Anonymously
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-full bg-white/20"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className={`px-4 py-2 rounded-full ${
            mood === 'chill' ? 'bg-pastel-yellow' : 'bg-pastel-purple'
          }`}
        >
          Share Your Story
        </button>
      )}
    </div>
  );
} 