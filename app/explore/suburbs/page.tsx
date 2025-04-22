'use client';

import { useState, useEffect } from 'react';
import { SuburbCard } from '@/components/SuburbCard';
import { SearchBar } from '@/components/SearchBar';
import { SortDropdown } from '@/components/SortDropdown';
import { SuburbData } from '@/data/melbourneSuburbs';

export default function SuburbsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [suburbs, setSuburbs] = useState<SuburbData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuburbs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/suburbs?search=${searchQuery}&sort=${sortBy}`);
        if (!response.ok) {
          throw new Error('Failed to fetch suburbs');
        }
        const data = await response.json();
        setSuburbs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuburbs, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Explore Melbourne Suburbs</h1>
      <p className="text-gray-600 mb-8">Discover the perfect suburb for your student life in Melbourne</p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by suburb name, postcode, or local government area..."
          />
        </div>
        <div className="w-full md:w-48">
          <SortDropdown
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'name', label: 'Name (A-Z)' },
              { value: 'rent', label: 'Rent (Low to High)' },
              { value: 'distance', label: 'Distance to CBD' },
              { value: 'population', label: 'Population' },
            ]}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading suburbs...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">Error: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suburbs.map((suburb) => (
            <SuburbCard key={suburb.suburbName} suburb={suburb} />
          ))}
        </div>
      )}

      {!loading && !error && suburbs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No suburbs found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
} 