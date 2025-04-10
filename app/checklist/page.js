'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Checklist() {
  const [completedItems, setCompletedItems] = useState({});

  useEffect(() => {
    // Load completed items from localStorage on mount
    const savedItems = localStorage.getItem('checklistCompletedItems');
    if (savedItems) {
      setCompletedItems(JSON.parse(savedItems));
    }
  }, []);

  const toggleItem = (id) => {
    setCompletedItems(prev => {
      const newItems = {
        ...prev,
        [id]: !prev[id]
      };
      // Save to localStorage whenever items change
      localStorage.setItem('checklistCompletedItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const visaChecklist = [
    {
      id: 'visa-1',
      title: 'Student Visa (Subclass 500)',
      description: 'Ensure your student visa is valid for the duration of your studies',
      link: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500',
      category: 'visa'
    },
    {
      id: 'visa-2',
      title: 'Visa Conditions',
      description: 'Review and understand your visa conditions (work limitations, study requirements)',
      link: 'https://immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/check-conditions-on-visa',
      category: 'visa'
    },
    {
      id: 'visa-3',
      title: 'Visa Expiry Date',
      description: 'Note your visa expiry date and plan for renewal if needed',
      category: 'visa'
    },
    {
      id: 'visa-4',
      title: 'Overseas Student Health Cover (OSHC)',
      description: 'Ensure you have valid OSHC coverage for the duration of your stay',
      link: 'https://www.privatehealth.gov.au/health_insurance/overseas/overseas_student_health_cover.htm',
      category: 'visa'
    }
  ];

  const bankingChecklist = [
    {
      id: 'bank-1',
      title: 'Open a Bank Account',
      description: 'Open an Australian bank account (recommended banks: Commonwealth, NAB, Westpac, ANZ)',
      link: 'https://www.commbank.com.au/personal/international-banking/moving-to-australia.html',
      category: 'banking'
    },
    {
      id: 'bank-2',
      title: 'Tax File Number (TFN)',
      description: 'Apply for a Tax File Number if you plan to work',
      link: 'https://www.ato.gov.au/individuals/tax-file-number/',
      category: 'banking'
    },
    {
      id: 'bank-3',
      title: 'Australian Business Number (ABN)',
      description: 'Apply for an ABN if you plan to work as a contractor or freelancer',
      link: 'https://abr.gov.au/for-business,-super-funds---charities/applying-for-an-abn/',
      category: 'banking'
    },
    {
      id: 'bank-4',
      title: 'Superannuation Account',
      description: 'Set up a superannuation account for retirement savings (required for employment)',
      link: 'https://www.ato.gov.au/individuals/super/',
      category: 'banking'
    }
  ];

  const accommodationChecklist = [
    {
      id: 'acc-1',
      title: 'Temporary Accommodation',
      description: 'Book temporary accommodation for your first few weeks',
      link: '/accommodation',
      category: 'accommodation'
    },
    {
      id: 'acc-2',
      title: 'Rental Application Documents',
      description: 'Prepare documents for rental applications (passport, visa, proof of funds)',
      category: 'accommodation'
    },
    {
      id: 'acc-3',
      title: 'Bond Payment',
      description: 'Budget for rental bond (typically 4 weeks rent)',
      category: 'accommodation'
    },
    {
      id: 'acc-4',
      title: 'Utilities Setup',
      description: 'Plan for setting up utilities (electricity, gas, internet)',
      category: 'accommodation'
    }
  ];

  const allItems = [...visaChecklist, ...bankingChecklist, ...accommodationChecklist];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Visa & Banking Checklist
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Essential steps for new students in Melbourne
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-l-lg hover:bg-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-white"
            onClick={() => document.getElementById('visa-section').scrollIntoView({ behavior: 'smooth' })}
          >
            Visa
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-indigo-700"
            onClick={() => document.getElementById('banking-section').scrollIntoView({ behavior: 'smooth' })}
          >
            Banking
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-indigo-700"
            onClick={() => document.getElementById('accommodation-section').scrollIntoView({ behavior: 'smooth' })}
          >
            Accommodation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Visa Section */}
        <div id="visa-section" className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Visa Requirements
            </h2>
            <div className="mt-4 space-y-4">
              {visaChecklist.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={item.id}
                      name={item.id}
                      type="checkbox"
                      checked={completedItems[item.id] || false}
                      onChange={() => toggleItem(item.id)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor={item.id} className={`font-medium ${completedItems[item.id] ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                      {item.title}
                    </label>
                    <p className={`text-sm ${completedItems[item.id] ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-500 mt-1 inline-block"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banking Section */}
        <div id="banking-section" className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Banking Setup
            </h2>
            <div className="mt-4 space-y-4">
              {bankingChecklist.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={item.id}
                      name={item.id}
                      type="checkbox"
                      checked={completedItems[item.id] || false}
                      onChange={() => toggleItem(item.id)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor={item.id} className={`font-medium ${completedItems[item.id] ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                      {item.title}
                    </label>
                    <p className={`text-sm ${completedItems[item.id] ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-500 mt-1 inline-block"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accommodation Section */}
        <div id="accommodation-section" className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Accommodation
            </h2>
            <div className="mt-4 space-y-4">
              {accommodationChecklist.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={item.id}
                      name={item.id}
                      type="checkbox"
                      checked={completedItems[item.id] || false}
                      onChange={() => toggleItem(item.id)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor={item.id} className={`font-medium ${completedItems[item.id] ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                      {item.title}
                    </label>
                    <p className={`text-sm ${completedItems[item.id] ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-500 mt-1 inline-block"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-12 bg-indigo-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">Need more help?</h3>
            <p className="text-gray-600 mb-3">Check out our comprehensive guide for new students in Melbourne.</p>
            <Link href="/starter-kit" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Visit Starter Kit →
            </Link>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">Student Support Services</h3>
            <p className="text-gray-600 mb-3">Connect with student support services at your institution.</p>
            <Link href="/tips" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Find Support →
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                Checklist Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {Math.round((Object.values(completedItems).filter(Boolean).length / allItems.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div
              style={{ width: `${(Object.values(completedItems).filter(Boolean).length / allItems.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
            ></div>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {Object.values(completedItems).filter(Boolean).length} of {allItems.length} items completed
        </p>
      </div>
    </div>
  );
} 