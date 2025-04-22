'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchStudentEvents, formatEventDate, getEventDateBadge } from '../../lib/eventbriteApi';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [timePeriod, setTimePeriod] = useState('15days');

  const timeOptions = [
    { value: '15days', label: 'Next 15 Days' },
    { value: '30days', label: 'Next 30 Days' },
    { value: '3months', label: 'Next 3 Months' },
    { value: '6months', label: 'Next 6 Months' }
  ];

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const events = await fetchStudentEvents(timePeriod);
        setEvents(events);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [timePeriod]);

  const filteredEvents = showPastEvents 
    ? events 
    : events.filter(event => new Date(event.start.utc) >= new Date());

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Monash Student Association Events
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Stay connected with campus activities and student events
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {timeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowPastEvents(!showPastEvents)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              showPastEvents 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {showPastEvents ? 'Hide Past Events' : 'Show Past Events'}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>No events found for the selected time period.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const dateBadge = getEventDateBadge(event.start.utc);
              return (
                <div key={event.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-48 w-full">
                    {event.logo ? (
                      <img
                        className="h-full w-full object-cover"
                        src={event.logo.url}
                        alt={event.name.text}
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-gray-900">{event.name.text}</h2>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dateBadge.color}`}>
                        {dateBadge.text}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{formatEventDate(event.start.utc)}</p>
                    {event.venue && (
                      <p className="mt-1 text-sm text-gray-500">{event.venue.name}</p>
                    )}
                    <p className="mt-3 text-gray-600 line-clamp-3">{event.description.text}</p>
                    <div className="mt-6">
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Register Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 