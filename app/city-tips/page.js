import Link from 'next/link';

export default function CityTips() {
  const transportTips = [
    {
      title: 'Student Bus Pass',
      description: 'Get a student bus pass for unlimited travel within the city. Available at the student union office.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      title: 'Bike Sharing',
      description: 'Use the city\'s bike sharing program for short trips. Student discount available with your university email.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Train Connections',
      description: 'Book train tickets in advance for weekend trips. Student railcards offer 1/3 off all rail travel.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    }
  ];

  const foodSpots = [
    {
      name: 'The Student Kitchen',
      type: 'Cafe',
      description: 'Budget-friendly cafe with student discounts. Great for quick meals between classes.',
      location: 'Near the university library',
      priceRange: '££'
    },
    {
      name: 'Global Bites',
      type: 'Restaurant',
      description: 'International cuisine with student-friendly prices. Perfect for group dinners.',
      location: 'City center',
      priceRange: '£££'
    },
    {
      name: 'Quick & Healthy',
      type: 'Takeaway',
      description: 'Healthy takeaway options with nutritional information. Student meal deals available.',
      location: 'Campus food court',
      priceRange: '£'
    }
  ];

  const studyPlaces = [
    {
      name: 'University Library',
      description: '24/7 access during exam periods. Quiet study areas and group study rooms available.',
      features: ['Free Wi-Fi', 'Printing facilities', 'Bookable study rooms', 'Coffee shop'],
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      name: 'City Public Library',
      description: 'A quiet space in the city center with plenty of natural light. Great for individual study.',
      features: ['Free Wi-Fi', 'Comfortable seating', 'Natural light', 'Reference materials'],
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      name: 'Study Cafe',
      description: 'A cozy cafe with a dedicated study area. Perfect for a change of scenery.',
      features: ['Power outlets', 'Coffee and snacks', 'Background music', 'Friendly atmosphere'],
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">City Tips for Students</h1>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to know about navigating city life as a student
          </p>
        </div>

        {/* Transport Tips Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transport Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportTips.map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-indigo-600 mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Food Spots Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Food Spots</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foodSpots.map((spot, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{spot.name}</h3>
                  <span className="text-gray-500 text-sm">{spot.priceRange}</span>
                </div>
                <p className="text-indigo-600 text-sm mb-2">{spot.type}</p>
                <p className="text-gray-600 mb-2">{spot.description}</p>
                <p className="text-gray-500 text-sm">{spot.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Study Places Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Places</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studyPlaces.map((place, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 w-full relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{place.name}</h3>
                  <p className="text-gray-600 mb-4">{place.description}</p>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {place.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <svg className="h-4 w-4 text-indigo-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Looking for accommodation in the city?</p>
          <Link 
            href="/accommodation" 
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition"
          >
            Browse Accommodations
          </Link>
        </div>
      </div>
    </div>
  );
} 