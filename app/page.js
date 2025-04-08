'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchStudentEvents, formatEventDate, getEventDateBadge } from '../lib/eventbriteApi';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventData = await fetchStudentEvents(3);
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Welcome to</span>
          <span className="block text-indigo-600">Student Hub</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Your complete guide to student life. Find accommodation, discover city tips, and make the most of your student experience.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/accommodation"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Find Accommodation
          </Link>
          <Link
            href="/city-tips"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 border-indigo-600"
          >
            Explore City Tips
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Student Accommodation</h3>
            </div>
            <div className="mt-4 text-gray-500">
              Find the perfect place to live with our curated list of student-friendly accommodations.
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Transport Tips</h3>
            </div>
            <div className="mt-4 text-gray-500">
              Learn how to navigate the city efficiently with our transport guides and tips.
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Study Spots</h3>
            </div>
            <div className="mt-4 text-gray-500">
              Discover the best places to study, from quiet libraries to cozy cafes.
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Preview */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Upcoming Student Events
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Don't miss out on these exciting events happening near you
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const dateBadge = getEventDateBadge(event.start.utc);
              return (
                <div key={event.id} className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{event.name.text}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dateBadge.color}`}>
                        {dateBadge.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{formatEventDate(event.start.utc)}</p>
                    {event.venue && (
                      <p className="text-sm text-gray-500 mt-1">{event.venue.name}</p>
                    )}
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{event.description?.text}</p>
                    <div className="mt-4">
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 border-indigo-600"
          >
            View All Events →
          </Link>
        </div>
      </section>

      {/* Explore Student Life Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Explore Student Life
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Discover resources to enhance your student experience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Tips Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Student Tips</h3>
                <p className="text-gray-500 mb-4">
                  Get insider advice from fellow students about campus life, study tips, and more.
                </p>
                <div className="flex justify-end">
                  <Link href="/city-tips" className="text-indigo-600 hover:text-indigo-900 font-medium">
                    See All →
                  </Link>
                </div>
              </div>
            </div>

            {/* Events Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Campus Events</h3>
                <p className="text-gray-500 mb-4">
                  Stay connected with upcoming events, workshops, and social gatherings on campus.
                </p>
                <div className="flex justify-end">
                  <Link href="/events" className="text-indigo-600 hover:text-indigo-900 font-medium">
                    See All →
                  </Link>
                </div>
              </div>
            </div>

            {/* Listings Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Accommodation</h3>
                <p className="text-gray-500 mb-4">
                  Browse student-friendly accommodation options near campus and find your perfect home.
                </p>
                <div className="flex justify-end">
                  <Link href="/accommodation" className="text-indigo-600 hover:text-indigo-900 font-medium">
                    See All →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/explore" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Explore All Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 