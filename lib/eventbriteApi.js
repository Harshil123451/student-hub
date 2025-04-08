'use client';

const EVENTBRITE_API_KEY = process.env.NEXT_PUBLIC_EVENTBRITE_API_KEY || '7ZFFREJUNHQDL6K67DFA';
const EVENTBRITE_API_URL = 'https://www.eventbriteapi.com/v3/events/search/';

export async function fetchStudentEvents(limit = 3) {
  try {
    const response = await fetch(
      `${EVENTBRITE_API_URL}?q=student&location.address=melbourne&expand=venue&sort_by=date&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${EVENTBRITE_API_KEY}`,
        },
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
  if (eventDate.toDateString() === today.toDateString()) {
    return { text: 'Today', date: formattedDate, color: 'bg-red-100 text-red-800' };
  } else if (eventDate.toDateString() === tomorrow.toDateString()) {
    return { text: 'Tomorrow', date: formattedDate, color: 'bg-yellow-100 text-yellow-800' };
  } else {
    return { text: 'Upcoming', date: formattedDate, color: 'bg-green-100 text-green-800' };
  }
} 