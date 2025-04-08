'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for events (would use Eventbrite API in production)
    const mockEvents = [
      {
        id: 1,
        name: 'Student Welcome Party',
        date: '2023-09-15T18:00:00',
        location: 'Student Union',
        description: 'Join us for a night of fun and networking with fellow students!',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
      {
        id: 2,
        name: 'Study Abroad Fair',
        date: '2023-09-20T14:00:00',
        location: 'Main Hall',
        description: 'Learn about study abroad opportunities and meet representatives from partner universities.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
      {
        id: 3,
        name: 'Career Networking Event',
        date: '2023-09-25T16:00:00',
        location: 'Business School',
        description: 'Connect with potential employers and learn about internship opportunities.',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
      {
        id: 4,
        name: 'Student Film Festival',
        date: '2023-10-05T19:00:00',
        location: 'Cinema Hall',
        description: 'Watch student-produced films and vote for your favorites.',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
      {
        id: 5,
        name: 'Sports Tournament',
        date: '2023-10-10T10:00:00',
        location: 'University Sports Complex',
        description: 'Participate in various sports competitions and win prizes.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
      {
        id: 6,
        name: 'Academic Writing Workshop',
        date: '2023-10-15T13:00:00',
        location: 'Library Conference Room',
        description: 'Learn tips and techniques for improving your academic writing skills.',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
    ];

    // Simulate API call delay
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Upcoming Events
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Stay connected with campus activities and student events
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="h-48 w-full">
                  <img
                    className="h-full w-full object-cover"
                    src={event.image}
                    alt={event.name}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
                  <p className="mt-2 text-sm text-gray-500">{formatDate(event.date)}</p>
                  <p className="mt-1 text-sm text-gray-500">{event.location}</p>
                  <p className="mt-3 text-gray-600">{event.description}</p>
                  <div className="mt-6">
                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Register Now
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