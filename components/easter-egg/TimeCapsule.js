'use client';

import { useState } from 'react';

const pastAdvice = [
  "Always carry a water bottle and snacks to lectures.",
  "The library is your best friend during finals week.",
  "Don't be afraid to ask for help from TAs and professors.",
  "Start assignments early, even if it's just reading the prompt.",
  "Join at least one club that has nothing to do with your major.",
  "Take breaks between study sessions - your brain needs it!",
  "Learn to cook at least 3 simple meals before moving out.",
  "Back up your files. Seriously. Do it now.",
  "Office hours are underrated - use them!",
  "Sleep is more important than that extra hour of studying.",
];

export default function TimeCapsule({ mood }) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(pastAdvice);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([newMessage, ...messages]);
      setNewMessage('');
      setShowForm(false);
    }
  };

  return (
    <div className={`p-6 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-pink/20' : 'bg-pastel-blue/20'
    }`}>
      <h2 className="text-2xl font-display mb-4">📝 TimeCapsule</h2>

      <div className="space-y-4">
        {messages.slice(0, 3).map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              mood === 'chill' ? 'bg-pastel-pink/30' : 'bg-pastel-blue/30'
            }`}
          >
            <p className="text-sm">"{message}"</p>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Leave your advice for future students..."
            className={`w-full p-3 rounded-lg mb-2 ${
              mood === 'chill' ? 'bg-pastel-pink/30' : 'bg-pastel-blue/30'
            }`}
            rows={3}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded-full ${
                mood === 'chill' ? 'bg-pastel-pink' : 'bg-pastel-blue'
              }`}
            >
              Submit
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
          className={`mt-4 px-4 py-2 rounded-full ${
            mood === 'chill' ? 'bg-pastel-pink' : 'bg-pastel-blue'
          }`}
        >
          Leave a Message
        </button>
      )}
    </div>
  );
} 