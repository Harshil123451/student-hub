'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchStudentEvents, formatEventDate, getEventDateBadge } from '../lib/eventbriteApi';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [userSituation, setUserSituation] = useState('');
  const [userNeeds, setUserNeeds] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

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

  const handleSituationSelect = (situation) => {
    setUserSituation(situation);
    setQuizStep(2);
  };

  const handleNeedToggle = (need) => {
    if (userNeeds.includes(need)) {
      setUserNeeds(userNeeds.filter(n => n !== need));
    } else {
      setUserNeeds([...userNeeds, need]);
    }
  };

  const generateRecommendations = () => {
    let recs = [];
    
    if (userSituation === 'new') {
      recs.push({
        title: 'Starter Kit',
        description: 'Essential guide for new students in Melbourne',
        link: '/starter-kit',
        icon: '🚀'
      });
    }
    
    if (userSituation === 'planning') {
      recs.push({
        title: 'Checklist',
        description: 'Visa and banking setup checklist',
        link: '/checklist',
        icon: '✅'
      });
    }
    
    if (userNeeds.includes('housing')) {
      recs.push({
        title: 'Accommodation',
        description: 'Find student-friendly housing options',
        link: '/accommodation',
        icon: '🏠'
      });
    }
    
    if (userNeeds.includes('food')) {
      recs.push({
        title: 'Restaurants',
        description: 'Find budget-friendly eats near you',
        link: '/explore/restaurants',
        icon: '🍽️'
      });
    }
    
    if (userNeeds.includes('documents')) {
      recs.push({
        title: 'Visa & Banking Checklist',
        description: 'Essential steps for visa and banking setup',
        link: '/checklist',
        icon: '🧾'
      });
    }
    
    if (userNeeds.includes('social')) {
      recs.push({
        title: 'Events',
        description: 'Find student events and social gatherings',
        link: '/events',
        icon: '🎉'
      });
    }
    
    // If no specific recommendations, suggest the starter kit
    if (recs.length === 0) {
      recs.push({
        title: 'Starter Kit',
        description: 'Essential guide for new students in Melbourne',
        link: '/starter-kit',
        icon: '🚀'
      });
    }
    
    setRecommendations(recs);
    setQuizStep(3);
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setUserSituation('');
    setUserNeeds([]);
    setRecommendations([]);
    setShowQuiz(false);
  };

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
        
        {/* New to Melbourne Button */}
        <div className="mt-8">
          <Link
            href="/starter-kit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            New to Melbourne? Start Here
          </Link>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="py-12 relative">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Quick Links</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Newcomers Category */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="bg-indigo-100 px-4 py-3">
              <h3 className="text-lg font-semibold text-indigo-800 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Newcomers
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <Link href="/starter-kit" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-indigo-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Starter Kit</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Essential guide for new students in Melbourne
                </div>
              </Link>
              <Link href="/tips" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-indigo-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Tips</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Student tips and advice from the community
                </div>
              </Link>
              <Link href="/checklist" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-indigo-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>🧾 Visa & Banking Checklist</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Essential steps for visa and banking setup
                </div>
              </Link>
            </div>
          </div>
          
          {/* Explore Category */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="bg-green-100 px-4 py-3">
              <h3 className="text-lg font-semibold text-green-800 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <Link href="/explore" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-green-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Explore</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Discover Melbourne's student-friendly places
                </div>
              </Link>
              <Link href="/forum" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-green-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span>Forum</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Connect with other students and share experiences
                </div>
              </Link>
              <Link href="/events" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-green-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Events</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Find student events and social gatherings
                </div>
              </Link>
              <Link href="/explore/restaurants" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-green-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>🍽️ Restaurants</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Find top-rated eats near you
                </div>
              </Link>
              <Link href="/explore/suburbs" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-green-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>🏙️ Suburb Search</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Find the perfect neighborhood for your lifestyle
                </div>
              </Link>
            </div>
          </div>
          
          {/* Tools Category */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="bg-blue-100 px-4 py-3">
              <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Tools
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <Link href="/accommodation" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-blue-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Submit Listing</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Post a listing for shared rooms
                </div>
              </Link>
              <Link href="/scam-alerts" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-blue-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>⚠️ Scam Alerts</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Stay safe from common student scams
                </div>
              </Link>
              <Link href="/roommates" className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors group/item relative">
                <svg className="h-5 w-5 text-blue-500 mr-3 group-hover/item:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>🧑‍🤝‍🧑 Find Roommates</span>
                <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Connect with potential roommates
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Help Me Decide Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center group transition-all duration-300 hover:scale-110"
            onClick={() => setShowQuiz(true)}
          >
            <span className="text-2xl mr-2">❓</span>
            <span className="font-medium">Help Me Decide</span>
          </button>
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

      {/* Student Tools Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Student Tools</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/tips"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            💡 Student Tips
          </Link>
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

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={resetQuiz}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Let's find what you need</h3>
            
            {/* Step 1: Situation */}
            {quizStep === 1 && (
              <div>
                <p className="mb-4 text-gray-600">What's your current situation?</p>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    className="flex items-center p-3 border rounded-lg hover:bg-indigo-50 transition-colors"
                    onClick={() => handleSituationSelect('new')}
                  >
                    <span className="text-2xl mr-3">🚀</span>
                    <div className="text-left">
                      <p className="font-medium">New to Melbourne</p>
                      <p className="text-sm text-gray-500">Just arrived or about to arrive</p>
                    </div>
                  </button>
                  <button 
                    className="flex items-center p-3 border rounded-lg hover:bg-indigo-50 transition-colors"
                    onClick={() => handleSituationSelect('studying')}
                  >
                    <span className="text-2xl mr-3">📚</span>
                    <div className="text-left">
                      <p className="font-medium">Currently Studying</p>
                      <p className="text-sm text-gray-500">Already a student in Melbourne</p>
                    </div>
                  </button>
                  <button 
                    className="flex items-center p-3 border rounded-lg hover:bg-indigo-50 transition-colors"
                    onClick={() => handleSituationSelect('planning')}
                  >
                    <span className="text-2xl mr-3">📅</span>
                    <div className="text-left">
                      <p className="font-medium">Planning to Study</p>
                      <p className="text-sm text-gray-500">Future student preparing</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Needs */}
            {quizStep === 2 && (
              <div>
                <p className="mb-4 text-gray-600">What do you need help with?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    className={`flex flex-col items-center p-3 border rounded-lg transition-colors ${userNeeds.includes('housing') ? 'bg-indigo-100 border-indigo-300' : 'hover:bg-indigo-50'}`}
                    onClick={() => handleNeedToggle('housing')}
                  >
                    <span className="text-2xl mb-1">🏠</span>
                    <p className="font-medium text-sm">Housing</p>
                  </button>
                  <button 
                    className={`flex flex-col items-center p-3 border rounded-lg transition-colors ${userNeeds.includes('food') ? 'bg-indigo-100 border-indigo-300' : 'hover:bg-indigo-50'}`}
                    onClick={() => handleNeedToggle('food')}
                  >
                    <span className="text-2xl mb-1">🍽️</span>
                    <p className="font-medium text-sm">Food</p>
                  </button>
                  <button 
                    className={`flex flex-col items-center p-3 border rounded-lg transition-colors ${userNeeds.includes('documents') ? 'bg-indigo-100 border-indigo-300' : 'hover:bg-indigo-50'}`}
                    onClick={() => handleNeedToggle('documents')}
                  >
                    <span className="text-2xl mb-1">📄</span>
                    <p className="font-medium text-sm">Documents</p>
                  </button>
                  <button 
                    className={`flex flex-col items-center p-3 border rounded-lg transition-colors ${userNeeds.includes('social') ? 'bg-indigo-100 border-indigo-300' : 'hover:bg-indigo-50'}`}
                    onClick={() => handleNeedToggle('social')}
                  >
                    <span className="text-2xl mb-1">👥</span>
                    <p className="font-medium text-sm">Social</p>
                  </button>
                </div>
                <div className="mt-6 flex justify-between">
                  <button 
                    className="text-indigo-600 hover:text-indigo-800"
                    onClick={() => setQuizStep(1)}
                  >
                    ← Back
                  </button>
                  <button 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    onClick={generateRecommendations}
                  >
                    Find Resources
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Recommendations */}
            {quizStep === 3 && (
              <div>
                <p className="mb-4 text-gray-600">Here are the best resources for you:</p>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <Link 
                      key={index}
                      href={rec.link}
                      className="flex items-center p-3 border rounded-lg hover:bg-indigo-50 transition-colors"
                      onClick={resetQuiz}
                    >
                      <span className="text-2xl mr-3">{rec.icon}</span>
                      <div className="text-left">
                        <p className="font-medium">{rec.title}</p>
                        <p className="text-sm text-gray-500">{rec.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    onClick={resetQuiz}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 