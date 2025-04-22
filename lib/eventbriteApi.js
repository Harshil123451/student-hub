'use client';

const EVENTBRITE_API_KEY = process.env.NEXT_PUBLIC_EVENTBRITE_API_KEY || '2WMVHIIYGXNZ6LOCDHNX';
const EVENTBRITE_API_URL = 'https://www.eventbriteapi.com/v3';

export function getDateRange(period = '15days') {
  const now = new Date();
  const startDate = new Date(now);
  let endDate = new Date(now);

  switch (period) {
    case '15days':
      endDate.setDate(now.getDate() + 15);
      break;
    case '30days':
      endDate.setDate(now.getDate() + 30);
      break;
    case '3months':
      endDate.setMonth(now.getMonth() + 3);
      break;
    case '6months':
      endDate.setMonth(now.getMonth() + 6);
      break;
    default:
      endDate.setDate(now.getDate() + 15);
  }

  // Format dates to ISO string and remove milliseconds
  const startDateStr = startDate.toISOString().split('.')[0] + 'Z';
  const endDateStr = endDate.toISOString().split('.')[0] + 'Z';

  return { startDateStr, endDateStr };
}

export async function fetchStudentEvents(period = '15days') {
  try {
    const { startDateStr, endDateStr } = getDateRange(period);

    const response = await fetch(
      `${EVENTBRITE_API_URL}/organizers/13953137008/events/?token=${EVENTBRITE_API_KEY}&start_date.range_start=${startDateStr}&start_date.range_end=${endDateStr}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Eventbrite API error: ${response.status}`);
    }

    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error fetching events from Eventbrite:', error);
    return [];
  }
}

export function formatEventDate(dateString) {
  const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function getEventDateBadge(dateString) {
  const eventDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Format for badge display
  const options = { month: 'short', day: 'numeric' };
  const formattedDate = eventDate.toLocaleDateString('en-US', options);
  
  // Determine badge color based on date
  if (eventDate < today) {
    return { text: 'Past', date: formattedDate, color: 'bg-gray-100 text-gray-800' };
  } else if (eventDate.toDateString() === today.toDateString()) {
    return { text: 'Today', date: formattedDate, color: 'bg-red-100 text-red-800' };
  } else if (eventDate.toDateString() === tomorrow.toDateString()) {
    return { text: 'Tomorrow', date: formattedDate, color: 'bg-yellow-100 text-yellow-800' };
  } else {
    return { text: 'Upcoming', date: formattedDate, color: 'bg-green-100 text-green-800' };
  }
} 