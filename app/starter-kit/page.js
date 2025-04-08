'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StarterKit() {
  const [openSection, setOpenSection] = useState('sim-card');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: 'sim-card',
      title: 'Getting a SIM Card',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p>Getting a local SIM card is one of the first things you should do when arriving in Melbourne.</p>
          
          <h3 className="font-medium text-gray-900">Popular Providers:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Telstra</strong> - Best coverage but more expensive</li>
            <li><strong>Optus</strong> - Good balance of coverage and price</li>
            <li><strong>Vodafone</strong> - Often cheaper but may have less coverage</li>
            <li><strong>Amaysim</strong> - Uses Optus network, prepaid only</li>
            <li><strong>ALDI Mobile</strong> - Uses Telstra network, prepaid only</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">What You'll Need:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Passport or Australian ID</li>
            <li>Proof of address (can be your university accommodation)</li>
            <li>Australian bank account (for postpaid plans)</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Student Plans:</h3>
          <p>Many providers offer special student plans with discounts. Check with your university for any partnerships with mobile providers.</p>
          
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="text-indigo-700"><strong>Pro Tip:</strong> Consider getting a prepaid plan first, then switching to a postpaid plan once you're settled and have an Australian bank account.</p>
          </div>
        </div>
      )
    },
    {
      id: 'transport',
      title: 'Transport Tips',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Myki Card</h3>
          <p>Myki is Melbourne's public transport ticketing system. You'll need one to travel on trains, trams, and buses.</p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Where to buy:</strong> Train stations, 7-Eleven stores, or online</li>
            <li><strong>Cost:</strong> $6 for the card + credit for travel</li>
            <li><strong>Student discount:</strong> Apply for a concession card through your university</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Useful Transport Apps:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>PTV</strong> - Official Public Transport Victoria app for journey planning</li>
            <li><strong>Google Maps</strong> - Great for navigation and public transport directions</li>
            <li><strong>Uber</strong> - Ride-sharing service</li>
            <li><strong>DiDi</strong> - Alternative ride-sharing service</li>
            <li><strong>Lime/Neuron</strong> - Electric scooter and bike sharing</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Transport Zones:</h3>
          <p>Melbourne is divided into zones 1 and 2. Most university campuses are in zone 1, but check your specific location.</p>
          
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="text-indigo-700"><strong>Pro Tip:</strong> The free City Circle Tram runs around the CBD and is a great way to explore the city center without using your Myki credit.</p>
          </div>
        </div>
      )
    },
    {
      id: 'banking',
      title: 'Banking',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p>Setting up an Australian bank account is essential for managing your finances while studying in Melbourne.</p>
          
          <h3 className="font-medium text-gray-900">Popular Banks for Students:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Commonwealth Bank</strong> - Student accounts with no monthly fees</li>
            <li><strong>Westpac</strong> - Student accounts with no monthly fees</li>
            <li><strong>ANZ</strong> - Student accounts with no monthly fees</li>
            <li><strong>NAB</strong> - Student accounts with no monthly fees</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">What You'll Need:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Passport</li>
            <li>Student ID or Confirmation of Enrolment</li>
            <li>Proof of address (can be your university accommodation)</li>
            <li>Tax File Number (TFN) - Apply for this after arriving</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">International Money Transfers:</h3>
          <p>Consider using services like Wise (formerly TransferWise), Revolut, or OFX for international money transfers as they often offer better exchange rates than traditional banks.</p>
          
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="text-indigo-700"><strong>Pro Tip:</strong> Many banks have branches on or near university campuses. Check if your university has a partnership with any bank for special student offers.</p>
          </div>
        </div>
      )
    },
    {
      id: 'apps',
      title: 'Useful Apps',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Transport & Navigation:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>PTV</strong> - Public transport information</li>
            <li><strong>Google Maps</strong> - Navigation and directions</li>
            <li><strong>Uber/DiDi</strong> - Ride-sharing services</li>
            <li><strong>Lime/Neuron</strong> - Electric scooter and bike sharing</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Food & Shopping:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Uber Eats/DoorDash</strong> - Food delivery</li>
            <li><strong>Menulog</strong> - Food delivery</li>
            <li><strong>Woolworths/Coles</strong> - Supermarket apps</li>
            <li><strong>Too Good To Go</strong> - Discounted food from restaurants</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Student Life:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>UniMelb/Monash/etc.</strong> - Your university's official app</li>
            <li><strong>Canvas/Blackboard</strong> - Learning management systems</li>
            <li><strong>Microsoft Office</strong> - For university work</li>
            <li><strong>Grammarly</strong> - Writing assistance</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Social & Entertainment:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>WhatsApp</strong> - Messaging with friends and family</li>
            <li><strong>Instagram</strong> - Social media</li>
            <li><strong>Spotify</strong> - Music streaming</li>
            <li><strong>Netflix</strong> - Video streaming</li>
          </ul>
          
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="text-indigo-700"><strong>Pro Tip:</strong> Many apps offer student discounts. Check if your university has any partnerships with app providers.</p>
          </div>
        </div>
      )
    },
    {
      id: 'food',
      title: 'Budget Food Tips',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Supermarkets:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Woolworths</strong> and <strong>Coles</strong> - Major supermarkets with regular sales</li>
            <li><strong>ALDI</strong> - Often cheaper for basics and pantry items</li>
            <li><strong>IGA</strong> - Smaller stores, may be more expensive but convenient</li>
            <li><strong>Asian supermarkets</strong> - Great for international ingredients, often cheaper</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Budget Shopping Tips:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Download supermarket apps to check weekly specials</li>
            <li>Shop at the end of the day for discounted items</li>
            <li>Buy in bulk for non-perishable items</li>
            <li>Look for student discounts at some stores</li>
            <li>Consider meal prepping to save money and time</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Cheap Eats:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>University cafeterias often offer student discounts</li>
            <li>Food courts in shopping centers have affordable options</li>
            <li>Look for "lunch specials" at restaurants</li>
            <li>Many Asian restaurants offer good value meals</li>
            <li>Check out student-run food markets on campus</li>
          </ul>
          
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="text-indigo-700"><strong>Pro Tip:</strong> Join Facebook groups for your university or suburb to find information about local food deals and student discounts.</p>
          </div>
        </div>
      )
    },
    {
      id: 'social',
      title: 'Social Spots & Clubs',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">University Clubs & Societies:</h3>
          <p>Joining clubs and societies is one of the best ways to meet people and make friends at university.</p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>Check your university's student union website for a list of clubs</li>
            <li>Look for clubs related to your course, hobbies, or cultural background</li>
            <li>Many universities have international student associations</li>
            <li>Sports clubs are great for staying active and meeting people</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Popular Social Spots:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Federation Square</strong> - Central meeting point with restaurants and bars</li>
            <li><strong>St Kilda Beach</strong> - Popular beach area with cafes and nightlife</li>
            <li><strong>Brunswick Street</strong> - Trendy area with cafes, bars, and live music</li>
            <li><strong>Lygon Street</strong> - Melbourne's "Little Italy" with restaurants and cafes</li>
            <li><strong>Chinatown</strong> - Great for Asian food and culture</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Nightlife:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>CBD</strong> - Many bars and clubs in the city center</li>
            <li><strong>Chapel Street</strong> - Popular for bars and clubs</li>
            <li><strong>Smith Street</strong> - Alternative bars and live music</li>
            <li><strong>St Kilda</strong> - Beachside bars and clubs</li>
          </ul>
          
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="text-indigo-700"><strong>Pro Tip:</strong> Many bars and clubs offer student discounts on certain days. Look for "student nights" or bring your student ID for discounts.</p>
          </div>
        </div>
      )
    },
    {
      id: 'safety',
      title: 'Safety Information',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p>Melbourne is generally a safe city, but it's always good to be aware of safety tips.</p>
          
          <h3 className="font-medium text-gray-900">Emergency Numbers:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>000</strong> - Emergency services (police, fire, ambulance)</li>
            <li><strong>131 444</strong> - Police assistance (non-emergency)</li>
            <li><strong>13 11 26</strong> - RACV roadside assistance</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Personal Safety:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Keep your valuables secure, especially in crowded areas</li>
            <li>Be aware of your surroundings, especially at night</li>
            <li>Travel with friends when possible, especially at night</li>
            <li>Let someone know where you're going and when you expect to return</li>
            <li>Use well-lit and populated routes</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">University Safety Services:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Most universities have campus security services</li>
            <li>Many offer free escort services at night</li>
            <li>Check if your university has a safety app</li>
            <li>Register for emergency alerts from your university</li>
          </ul>
          
          <h3 className="font-medium text-gray-900">Health & Medical:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Register with a local GP (doctor)</li>
            <li>Know the location of the nearest hospital</li>
            <li>Consider getting private health insurance</li>
            <li>Keep a basic first aid kit</li>
          </ul>
          
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="text-indigo-700"><strong>Pro Tip:</strong> Save emergency numbers in your phone and consider downloading a personal safety app like bSafe or Circle of 6.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Melbourne Student Starter Kit</h1>
        <p className="mt-3 text-xl text-gray-500">
          Everything you need to know as a new student in Melbourne
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-white shadow overflow-hidden rounded-lg">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                  {section.icon}
                </div>
                <h2 className="ml-4 text-lg font-medium text-gray-900">{section.title}</h2>
              </div>
              <svg
                className={`h-5 w-5 text-gray-500 transform transition-transform ${
                  openSection === section.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openSection === section.id && (
              <div className="px-6 pb-6">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/explore"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Explore More Resources
        </Link>
      </div>
    </div>
  );
} 