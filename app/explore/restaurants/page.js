'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Foursquare API key
const FOURSQUARE_API_KEY = 'fsq3uEYlpdJuYZqnHI++vYR3vC7c0WGm/ALKkxo83HsEna8=';

// Placeholder image as a data URL
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a5c0c3c5c%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2Cmonospace%2C%26quot%3BSegoe%20UI%20Mono%26quot%3B%2C%26quot%3BRoboto%20Mono%26quot%3B%2C%26quot%3BMonaco%26quot%3B%2C%26quot%3BCourier%20New%26quot%3B%2Cmonospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a5c0c3c5c%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22147.5%22%20y%3D%22158.5%22%3ERestaurant%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Showing default Melbourne restaurants.');
          // Default to Melbourne CBD coordinates
          setUserLocation({ lat: -37.8136, lng: 144.9631 });
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Showing default Melbourne restaurants.');
      // Default to Melbourne CBD coordinates
      setUserLocation({ lat: -37.8136, lng: 144.9631 });
    }
  }, []);

  // Fetch restaurants when location is available
  useEffect(() => {
    if (userLocation) {
      fetchRestaurants();
    }
  }, [userLocation]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the Foursquare API to get nearby restaurants
      const response = await fetch(
        `https://api.foursquare.com/v3/places/search?ll=${userLocation.lat},${userLocation.lng}&radius=5000&categories=13065&limit=50`,
        {
          headers: {
            'Authorization': FOURSQUARE_API_KEY,
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Process and format the restaurant data
      const formattedRestaurants = data.results.map(place => ({
        id: place.fsq_id,
        name: place.name,
        address: place.location.formatted_address || `${place.location.address || ''}, ${place.location.locality || 'Melbourne'}`,
        rating: place.rating || 'N/A',
        userRatingsTotal: place.stats?.total_ratings || 0,
        priceLevel: place.price || 'N/A',
        photo: place.photos && place.photos[0] ? 
          `${place.photos[0].prefix}400x400${place.photos[0].suffix}` : 
          PLACEHOLDER_IMAGE,
        categories: place.categories || [],
        geometry: {
          location: {
            lat: place.geocodes.main.latitude,
            lng: place.geocodes.main.longitude
          }
        },
        hours: place.hours?.display || 'Hours not available',
        website: place.website || null,
        phone: place.tel || null
      }));

      setRestaurants(formattedRestaurants);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Failed to load restaurants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort restaurants
  const filteredRestaurants = restaurants
    .filter(restaurant => {
      // Apply search filter
      const matchesSearch = searchQuery === '' || 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply cuisine filter
      const matchesCuisine = cuisineFilter === 'all' || 
        restaurant.categories.some(category => 
          category.name.toLowerCase().includes(cuisineFilter.toLowerCase())
        );
      
      // Apply price filter
      const matchesPrice = priceFilter === 'all' || 
        (priceFilter === 'budget' && restaurant.priceLevel === 1) ||
        (priceFilter === 'moderate' && restaurant.priceLevel === 2) ||
        (priceFilter === 'expensive' && restaurant.priceLevel === 3) ||
        (priceFilter === 'luxury' && restaurant.priceLevel === 4);
      
      return matchesSearch && matchesCuisine && matchesPrice;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'rating') {
        return (b.rating === 'N/A' ? 0 : b.rating) - (a.rating === 'N/A' ? 0 : a.rating);
      } else if (sortBy === 'popularity') {
        return b.userRatingsTotal - a.userRatingsTotal;
      } else if (sortBy === 'price-low') {
        return (a.priceLevel === 'N/A' ? 999 : a.priceLevel) - (b.priceLevel === 'N/A' ? 999 : b.priceLevel);
      } else if (sortBy === 'price-high') {
        return (b.priceLevel === 'N/A' ? 0 : b.priceLevel) - (a.priceLevel === 'N/A' ? 0 : a.priceLevel);
      }
      return 0;
    });

  // Get cuisine types from restaurant data
  const cuisineTypes = [...new Set(
    restaurants.flatMap(restaurant => 
      restaurant.categories.map(category => category.name)
    )
  )].filter(Boolean);

  // Format price level
  const formatPriceLevel = (level) => {
    if (level === 'N/A') return 'Price not available';
    return '$'.repeat(level);
  };

  // Get distance from user
  const getDistance = (lat, lng) => {
    if (!userLocation) return null;
    
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat - userLocation.lat);
    const dLon = deg2rad(lng - userLocation.lng);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(userLocation.lat)) * Math.cos(deg2rad(lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Melbourne Restaurants
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Discover great places to eat near you
        </p>
        {locationError && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-md inline-block">
            {locationError}
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
          >
            <option value="all">All Cuisines</option>
            {cuisineTypes.map((cuisine, index) => (
              <option key={index} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="budget">Budget ($)</option>
            <option value="moderate">Moderate ($$)</option>
            <option value="expensive">Expensive ($$$)</option>
            <option value="luxury">Luxury ($$$$)</option>
          </select>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6 flex justify-end">
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            className="px-3 py-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <svg className="animate-spin h-10 w-10 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-500">Loading restaurants...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={restaurant.photo} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold text-gray-800 flex items-center">
                    <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {restaurant.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{restaurant.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{restaurant.address}</p>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{formatPriceLevel(restaurant.priceLevel)}</span>
                      <span className="text-xs text-gray-400">({restaurant.userRatingsTotal} reviews)</span>
                    </div>
                    {restaurant.geometry && (
                      <span className="text-xs text-gray-500">
                        {getDistance(restaurant.geometry.location.lat, restaurant.geometry.location.lng)}
                      </span>
                    )}
                  </div>
                  
                  {restaurant.hours && (
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Hours:</span> {restaurant.hours}
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      View on Map
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Directions
                    </a>
                  </div>
                  
                  {restaurant.website && (
                    <div className="mt-3">
                      <a 
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No restaurants found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* Popular Areas */}
      <div className="mt-12 bg-indigo-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Dining Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">CBD & Chinatown</h3>
            <p className="text-gray-600 mb-3">Melbourne's central business district offers diverse dining options from street food to fine dining.</p>
            <button 
              onClick={() => {
                setUserLocation({ lat: -37.8136, lng: 144.9631 });
                setSearchQuery('');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Explore CBD Restaurants →
            </button>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">Brunswick</h3>
            <p className="text-gray-600 mb-3">Known for its multicultural food scene, especially Middle Eastern, Italian, and Vietnamese cuisine.</p>
            <button 
              onClick={() => {
                setUserLocation({ lat: -37.7667, lng: 144.9667 });
                setSearchQuery('');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Explore Brunswick Restaurants →
            </button>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">St Kilda</h3>
            <p className="text-gray-600 mb-3">Beachside dining with a mix of cafes, seafood restaurants, and international cuisine.</p>
            <button 
              onClick={() => {
                setUserLocation({ lat: -37.8675, lng: 144.9825 });
                setSearchQuery('');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Explore St Kilda Restaurants →
            </button>
          </div>
        </div>
      </div>

      {/* Student Budget Tips */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Student Budget Dining Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Save Money on Food</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Look for student discounts at restaurants (many offer 10-15% off with student ID)</li>
              <li>Visit during happy hours for discounted drinks and appetizers</li>
              <li>Check out food courts in shopping centers for affordable options</li>
              <li>Many restaurants offer lunch specials that are cheaper than dinner</li>
              <li>Consider sharing dishes with friends to try more food for less money</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Student-Friendly Areas</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Carlton - Near the University of Melbourne, with many affordable cafes</li>
              <li>Footscray - Known for cheap and delicious Vietnamese food</li>
              <li>North Melbourne - Home to RMIT with budget-friendly options</li>
              <li>Box Hill - Great for Asian cuisine at student-friendly prices</li>
              <li>Clayton - Near Monash University with diverse dining options</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 