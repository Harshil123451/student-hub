'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ScamAlerts() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const scamCategories = [
    { id: 'all', name: 'All Scams', icon: '🔍' },
    { id: 'housing', name: 'Housing', icon: '🏠' },
    { id: 'employment', name: 'Employment', icon: '💼' },
    { id: 'financial', name: 'Financial', icon: '💰' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'identity', name: 'Identity Theft', icon: '🪪' },
    { id: 'online', name: 'Online Scams', icon: '🌐' }
  ];

  const scamAlerts = [
    {
      id: 'housing-1',
      title: 'Fake Rental Listings',
      description: 'Scammers post fake rental properties with attractive photos and low prices. They ask for deposits or rent payments before you can view the property.',
      warning: 'Never pay for a property you haven\'t seen in person. Be suspicious of deals that seem too good to be true.',
      category: 'housing',
      severity: 'high',
      date: '2023-12-15',
      tips: [
        'Always inspect properties in person before paying any money',
        'Verify the agent or landlord\'s identity',
        'Use reputable rental platforms like Domain or RealEstate.com.au',
        'Be cautious of urgent requests for payment',
        'Check if the property actually exists on Google Maps'
      ]
    },
    {
      id: 'employment-1',
      title: 'Job Scams',
      description: 'Fake job offers that require upfront payment for training, uniforms, or "processing fees." Often promise high salaries for minimal work.',
      warning: 'Legitimate employers never ask for upfront payments. Be wary of job offers that seem too good to be true.',
      category: 'employment',
      severity: 'high',
      date: '2023-12-10',
      tips: [
        'Research the company thoroughly before accepting any job',
        'Never pay money to get a job',
        'Be suspicious of job offers via WhatsApp or Telegram',
        'Check if the company has a legitimate website and office',
        'Verify the job posting on the company\'s official website'
      ]
    },
    {
      id: 'financial-1',
      title: 'Tax Refund Scams',
      description: 'Scammers posing as the Australian Taxation Office (ATO) claiming you owe money or are eligible for a refund. They demand immediate payment or personal information.',
      warning: 'The ATO will never threaten immediate arrest or demand payment via gift cards or cryptocurrency.',
      category: 'financial',
      severity: 'high',
      date: '2023-12-05',
      tips: [
        'The ATO never asks for payment via gift cards or cryptocurrency',
        'Verify any ATO communication by calling them directly',
        'Never share your TFN or bank details over email or phone',
        'Be suspicious of urgent threats or demands',
        'Check the ATO website for current scam alerts'
      ]
    },
    {
      id: 'education-1',
      title: 'Fake Education Agents',
      description: 'Unauthorized agents claiming to help with university applications or visa processes for a fee, then disappearing with your money.',
      warning: 'Only use education agents registered with the Australian government.',
      category: 'education',
      severity: 'medium',
      date: '2023-11-28',
      tips: [
        'Verify if the agent is registered on the MARA website',
        'Get everything in writing before paying any fees',
        'Be cautious of agents who pressure you to make quick decisions',
        'Check if the agent has a physical office you can visit',
        'Verify the information they provide with official sources'
      ]
    },
    {
      id: 'identity-1',
      title: 'Passport/ID Theft',
      description: 'Scammers asking to "verify" your identity by sending photos of your passport, driver\'s license, or other ID documents.',
      warning: 'Never send photos of your ID documents to anyone you don\'t trust completely.',
      category: 'identity',
      severity: 'high',
      date: '2023-11-20',
      tips: [
        'Never share photos of your passport or ID documents via email or messaging apps',
        'Be cautious of requests to "verify" your identity',
        'Monitor your bank accounts for suspicious activity',
        'Report lost or stolen documents immediately',
        'Consider using a password manager to protect your online accounts'
      ]
    },
    {
      id: 'online-1',
      title: 'Social Media Scams',
      description: 'Fake profiles on social media offering deals, prizes, or investment opportunities. Often target international students who may be unfamiliar with local scams.',
      warning: 'Be extremely cautious of unsolicited messages offering money or deals on social media.',
      category: 'online',
      severity: 'medium',
      date: '2023-11-15',
      tips: [
        'Never click on suspicious links in messages',
        'Be wary of profiles with few friends or recent creation dates',
        'Don\'t share personal information in response to online surveys or quizzes',
        'Verify the identity of people you meet online before meeting in person',
        'Use privacy settings to limit who can contact you'
      ]
    },
    {
      id: 'financial-2',
      title: 'Cryptocurrency Investment Scams',
      description: 'Fake investment opportunities promising high returns on cryptocurrency investments. Often use pressure tactics and fake testimonials.',
      warning: 'Be extremely cautious of anyone promoting cryptocurrency investments with guaranteed returns.',
      category: 'financial',
      severity: 'high',
      date: '2023-11-10',
      tips: [
        'Never invest more than you can afford to lose',
        'Be suspicious of guaranteed returns or pressure to invest quickly',
        'Research any investment opportunity thoroughly',
        'Avoid investments that require you to recruit others',
        'Check if the investment platform is registered with ASIC'
      ]
    },
    {
      id: 'housing-2',
      title: 'Roommate Scams',
      description: 'Fake roommates who ask for deposits or rent payments before moving in, then disappear with your money.',
      warning: 'Always meet potential roommates in person and verify their identity before paying any money.',
      category: 'housing',
      severity: 'medium',
      date: '2023-11-05',
      tips: [
        'Meet potential roommates in person before agreeing to live together',
        'Get everything in writing, including the lease agreement',
        'Be cautious of roommates who can\'t meet in person',
        'Verify the property ownership before paying any money',
        'Use reputable roommate finder websites with verification systems'
      ]
    }
  ];

  const filteredScams = scamAlerts.filter(scam => {
    const matchesCategory = activeCategory === 'all' || scam.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      scam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      scam.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Scam Alerts
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Stay informed about common scams targeting international students in Melbourne
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search for scams..."
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

      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {scamCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span> {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Scam Alerts */}
      <div className="grid grid-cols-1 gap-6">
        {filteredScams.length > 0 ? (
          filteredScams.map((scam) => (
            <div key={scam.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{scam.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(scam.severity)}`}>
                    {scam.severity.charAt(0).toUpperCase() + scam.severity.slice(1)} Risk
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{scam.description}</p>
                
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">{scam.warning}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Protection Tips:</h4>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    {scam.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-600">{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Alert posted on {new Date(scam.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No scams found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="mt-12 bg-indigo-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">If you've been scammed</h3>
            <p className="text-gray-600 mb-3">Report scams to the Australian Competition and Consumer Commission (ACCC).</p>
            <a href="https://www.scamwatch.gov.au/report-a-scam" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Report to Scamwatch →
            </a>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">For identity theft</h3>
            <p className="text-gray-600 mb-3">Contact IDCARE for support if your identity has been compromised.</p>
            <a href="https://www.idcare.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Contact IDCARE →
            </a>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/tips" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <h3 className="font-medium text-gray-900 mb-1">Student Tips</h3>
            <p className="text-sm text-gray-500">Read tips from other students about staying safe in Melbourne.</p>
          </Link>
          <Link href="/checklist" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <h3 className="font-medium text-gray-900 mb-1">Visa & Banking Checklist</h3>
            <p className="text-sm text-gray-500">Ensure your visa and banking setup is secure and legitimate.</p>
          </Link>
          <Link href="/starter-kit" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <h3 className="font-medium text-gray-900 mb-1">Starter Kit</h3>
            <p className="text-sm text-gray-500">Comprehensive guide for new students in Melbourne.</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 