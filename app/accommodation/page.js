import Link from 'next/link';

export default function Accommodation() {
  const accommodations = [
    {
      id: 1,
      title: 'Student Residences at University Park',
      price: '£120/week',
      location: '10 minutes from campus',
      description: 'Modern student accommodation with en-suite rooms, shared kitchen facilities, and 24/7 security. Includes high-speed internet and study spaces.',
      features: ['En-suite rooms', 'Shared kitchen', 'Study spaces', '24/7 security', 'High-speed internet'],
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'City View Apartments',
      price: '£150/week',
      location: 'City center',
      description: 'Stylish apartments in the heart of the city, perfect for students who want to be close to everything. Each apartment has its own kitchen and living area.',
      features: ['Private kitchen', 'Living area', 'Bike storage', 'Laundry facilities', 'City views'],
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: 'Green Gardens Student House',
      price: '£100/week',
      location: 'Quiet residential area',
      description: 'A cozy house in a quiet neighborhood, perfect for students who prefer a more home-like environment. Shared rooms available for budget-conscious students.',
      features: ['Shared rooms', 'Garden', 'Fully furnished', 'Bills included', 'Friendly neighborhood'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Student Accommodation</h1>
          <p className="mt-4 text-xl text-gray-600">
            Find the perfect place to live during your studies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 w-full relative">
                <img
                  src={accommodation.image}
                  alt={accommodation.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{accommodation.title}</h2>
                <div className="flex items-center mb-2">
                  <span className="text-indigo-600 font-medium">{accommodation.price}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-gray-500">{accommodation.location}</span>
                </div>
                <p className="text-gray-600 mb-4">{accommodation.description}</p>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Features:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {accommodation.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="h-4 w-4 text-indigo-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need help finding the right accommodation?</p>
          <Link 
            href="/city-tips" 
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition"
          >
            Check our City Tips
          </Link>
        </div>
      </div>
    </div>
  );
} 