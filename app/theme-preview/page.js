'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ThemePreview() {
  const [selectedColor, setSelectedColor] = useState(null);

  const colorPalettes = [
    {
      name: 'Primary Colors',
      colors: [
        { name: 'Indigo', base: 'indigo-600', light: 'indigo-100', dark: 'indigo-800', text: 'indigo-50' },
        { name: 'Blue', base: 'blue-600', light: 'blue-100', dark: 'blue-800', text: 'blue-50' },
        { name: 'Green', base: 'green-600', light: 'green-100', dark: 'green-800', text: 'green-50' },
        { name: 'Red', base: 'red-600', light: 'red-100', dark: 'red-800', text: 'red-50' },
        { name: 'Yellow', base: 'yellow-600', light: 'yellow-100', dark: 'yellow-800', text: 'yellow-50' },
        { name: 'Purple', base: 'purple-600', light: 'purple-100', dark: 'purple-800', text: 'purple-50' },
      ]
    },
    {
      name: 'Neutral Colors',
      colors: [
        { name: 'Gray', base: 'gray-600', light: 'gray-100', dark: 'gray-800', text: 'gray-50' },
        { name: 'Slate', base: 'slate-600', light: 'slate-100', dark: 'slate-800', text: 'slate-50' },
        { name: 'Zinc', base: 'zinc-600', light: 'zinc-100', dark: 'zinc-800', text: 'zinc-50' },
        { name: 'Stone', base: 'stone-600', light: 'stone-100', dark: 'stone-800', text: 'stone-50' },
      ]
    },
    {
      name: 'Semantic Colors',
      colors: [
        { name: 'Success', base: 'green-600', light: 'green-100', dark: 'green-800', text: 'green-50' },
        { name: 'Warning', base: 'yellow-600', light: 'yellow-100', dark: 'yellow-800', text: 'yellow-50' },
        { name: 'Error', base: 'red-600', light: 'red-100', dark: 'red-800', text: 'red-50' },
        { name: 'Info', base: 'blue-600', light: 'blue-100', dark: 'blue-800', text: 'blue-50' },
      ]
    }
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Theme Preview</h1>
          <p className="mt-2 text-gray-600">Color swatches and UI components for reference</p>
        </div>

        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Home
          </Link>
        </div>

        {selectedColor && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Selected Color: {selectedColor.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`h-24 rounded-lg bg-${selectedColor.base} flex items-center justify-center`}>
                <span className={`text-${selectedColor.text} font-medium`}>Base</span>
              </div>
              <div className={`h-24 rounded-lg bg-${selectedColor.light} flex items-center justify-center`}>
                <span className="text-gray-800 font-medium">Light</span>
              </div>
              <div className={`h-24 rounded-lg bg-${selectedColor.dark} flex items-center justify-center`}>
                <span className={`text-${selectedColor.text} font-medium`}>Dark</span>
              </div>
              <div className="h-24 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-medium">Usage Examples:</p>
                  <button className={`mt-2 px-3 py-1 rounded-md text-sm font-medium text-white bg-${selectedColor.base} hover:bg-${selectedColor.dark}`}>
                    Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {colorPalettes.map((palette) => (
            <div key={palette.name} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">{palette.name}</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {palette.colors.map((color) => (
                    <div 
                      key={color.name} 
                      className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleColorClick(color)}
                    >
                      <div className={`h-16 bg-${color.base}`}></div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">{color.name}</h3>
                        <div className="mt-2 flex space-x-2">
                          <div className={`w-6 h-6 rounded-full bg-${color.light}`}></div>
                          <div className={`w-6 h-6 rounded-full bg-${color.base}`}></div>
                          <div className={`w-6 h-6 rounded-full bg-${color.dark}`}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">UI Components</h2>
          </div>
          <div className="p-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Primary
                  </button>
                  <button className="px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
                    Secondary
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Success
                  </button>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                    Warning
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Danger
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="h-40 bg-gray-200"></div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900">Card Title</h4>
                      <p className="mt-1 text-sm text-gray-500">This is a sample card with some content.</p>
                      <button className="mt-4 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                        Action
                      </button>
                    </div>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg overflow-hidden shadow-sm">
                    <div className="h-40 bg-indigo-100"></div>
                    <div className="p-4">
                      <h4 className="font-medium text-indigo-900">Colored Card</h4>
                      <p className="mt-1 text-sm text-indigo-700">This is a sample card with a colored background.</p>
                      <button className="mt-4 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                        Action
                      </button>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900">Simple Card</h4>
                      <p className="mt-1 text-sm text-gray-500">This is a simple card without an image.</p>
                      <div className="mt-4 flex space-x-2">
                        <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                          Action
                        </button>
                        <button className="px-3 py-1 bg-white text-indigo-600 border border-indigo-600 text-sm rounded-md hover:bg-indigo-50">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">Alerts</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Information</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>This is an information alert with some details.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Success</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>This is a success alert with some details.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>This is a warning alert with some details.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>This is an error alert with some details.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 