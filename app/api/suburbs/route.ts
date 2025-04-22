import { NextResponse } from 'next/server';
import { melbourneSuburbs } from '../../../data/melbourneSuburbs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const sortBy = searchParams.get('sort') || 'name';

  // Filter suburbs based on search query
  let filteredSuburbs = melbourneSuburbs.filter(suburb =>
    suburb.suburbName.toLowerCase().includes(searchQuery) ||
    suburb.postcode.includes(searchQuery) ||
    suburb.localGovernmentArea.toLowerCase().includes(searchQuery)
  );

  // Sort suburbs
  filteredSuburbs = [...filteredSuburbs].sort((a, b) => {
    switch (sortBy) {
      case 'rent':
        return a.medianRent - b.medianRent;
      case 'distance':
        return a.distanceToCBD - b.distanceToCBD;
      case 'population':
        return b.population - a.population;
      case 'name':
      default:
        return a.suburbName.localeCompare(b.suburbName);
    }
  });

  return NextResponse.json(filteredSuburbs);
} 