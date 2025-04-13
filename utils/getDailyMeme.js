export async function getDailyMeme() {
  // Check if we have a meme stored for today
  const today = new Date().toDateString();
  const storedMeme = localStorage.getItem(`dailyMeme_${today}`);
  
  if (storedMeme) {
    return JSON.parse(storedMeme);
  }

  try {
    // Fetch new memes from the API
    const response = await fetch('https://meme-api.com/gimme/collegememes/1');
    if (!response.ok) throw new Error('Failed to fetch meme');
    
    const data = await response.json();
    if (!data.memes || !Array.isArray(data.memes) || data.memes.length === 0) {
      throw new Error('No memes available');
    }

    // Store the first meme for today
    const dailyMeme = data.memes[0];
    localStorage.setItem(`dailyMeme_${today}`, JSON.stringify(dailyMeme));
    
    return dailyMeme;
  } catch (error) {
    console.error('Error fetching daily meme:', error);
    // Return a default meme if something goes wrong
    return {
      url: 'https://i.imgflip.com/1bij.jpg',
      title: 'Default Meme',
      author: 'System'
    };
  }
} 