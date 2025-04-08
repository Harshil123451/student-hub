export async function fetchRestaurants(location = 'Clayton', limit = 10) {
  try {
    const response = await fetch(
      `https://api.foursquare.com/v3/places/search?query=restaurant&near=${location}&limit=${limit}&sort=RATING&fields=fsq_id,name,location,photos,rating,price,hours,categories,description,tel,website,stats`,
      {
        headers: {
          'Authorization': 'fsq3uEYlpdJuYZqnHI++vYR3vC7c0WGm/ALKkxo83HsEna8=',
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Foursquare API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error('Failed to load restaurants. Please try again.');
  }
} 