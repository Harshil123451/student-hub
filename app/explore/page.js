'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import { fetchStudentEvents, formatEventDate, getEventDateBadge } from '../../lib/eventbriteApi';
import RestaurantsSection from '../../components/RestaurantsSection';
import Image from 'next/image';

const fallbackImage = '/images/placeholder.png';

const categoryIcons = {
  Transport: '🚍',
  Food: '🍜',
  Study: '📖'
};

export default function ExplorePage() {
  const [trendingTips, setTrendingTips] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [popularListings, setPopularListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch trending tips from Supabase
        const { data: tipsData, error: tipsError } = await supabase
          .from('student_tips')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (tipsError) throw tipsError;
        setTrendingTips(tipsData || []);

        // Fetch popular listings from Supabase
        const { data: listingsData, error: listingsError } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (listingsError) throw listingsError;
        setPopularListings(listingsData || []);

        // Fetch events from Eventbrite API for next 15 days
        const events = await fetchStudentEvents('15days');
        // Filter out past events and limit to 3
        const filteredEvents = events
          .filter(event => new Date(event.start.utc) >= new Date())
          .slice(0, 3);
        setUpcomingEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const HouseIcon = () => (
    <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
      <svg 
        className="h-8 w-8 text-gray-400" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
        />
      </svg>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Explore Student Life</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Discover resources, events, and places to enhance your student experience
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Trending Tips Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Trending Tips</h2>
              <div className="space-y-4">
                {trendingTips.length > 0 ? (
                  trendingTips.map((tip) => (
                    <div key={tip.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <span className="mr-2 text-xl">{categoryIcons[tip.category] || '📌'}</span>
                        <span className="text-sm font-medium text-gray-500">{tip.category}</span>
                      </div>
                      <p className="text-sm text-gray-700">{tip.tip}</p>
                      <div className="mt-2 flex justify-end">
                        <Link
                          href="/city-tips"
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          View All Tips →
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No tips available yet.</p>
                )}
              </div>
              <div className="mt-6">
                <Link
                  href="/city-tips"
                  className="text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  View All Tips →
                </Link>
              </div>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => {
                    const dateBadge = getEventDateBadge(event.start.utc);
                    return (
                      <div key={event.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900">{event.name.text}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dateBadge.color}`}>
                            {dateBadge.text}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{formatEventDate(event.start.utc)}</p>
                        {event.venue && (
                          <p className="text-sm text-gray-500">{event.venue.name}</p>
                        )}
                        <div className="mt-2">
                          <a 
                            href={event.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-900"
                          >
                            Learn More →
                          </a>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No upcoming events.</p>
                )}
              </div>
              <div className="mt-6">
                <Link
                  href="/events"
                  className="text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  View All Events →
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Listings Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Listings</h2>
              <div className="space-y-4">
                {popularListings.length > 0 ? (
                  popularListings.map((listing) => (
                    <div key={listing.id} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        {listing.image_url && !imageErrors[listing.id] ? (
                          <Image
                            src={listing.image_url.startsWith('http') ? listing.image_url : `/${listing.image_url}`}
                            alt={listing.title}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-md object-cover"
                            onError={() => handleImageError(listing.id)}
                          />
                        ) : (
                          <HouseIcon />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{listing.title}</h3>
                        <p className="text-sm text-gray-500">{listing.location}</p>
                        <p className="text-sm font-medium text-indigo-600">£{listing.price}/week</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No listings available yet.</p>
                )}
              </div>
              <div className="mt-6">
                <Link
                  href="/accommodation"
                  className="text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  View All Listings →
                </Link>
              </div>
            </div>
          </div>

          {/* Restaurants Section */}
          <div className="col-span-2">
            <RestaurantsSection initialLocation="Clayton" limit={5} />
          </div>
        </div>
      )}
    </div>
  );
} 