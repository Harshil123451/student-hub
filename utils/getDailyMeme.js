export async function getDailyMeme() {
  // Check if we have memes stored for today
  const today = new Date().toDateString();
  const storedMemes = localStorage.getItem(`dailyMemes_${today}`);
  
  if (storedMemes) {
    return JSON.parse(storedMemes);
  }

  try {
    // Fetch new memes from the API
    const response = await fetch('https://meme-api.com/gimme/collegememes/3');
    if (!response.ok) throw new Error('Failed to fetch memes');
    
    const data = await response.json();
    if (!data.memes || !Array.isArray(data.memes) || data.memes.length === 0) {
      throw new Error('No memes available');
    }

    // Store the memes for today
    localStorage.setItem(`dailyMemes_${today}`, JSON.stringify(data.memes));
    
    return data.memes;
  } catch (error) {
    console.error('Error fetching daily memes:', error);
    // Return default memes if something goes wrong
    return [
      {
        url: 'https://i.imgflip.com/1bij.jpg',
        title: 'Default Meme 1',
        author: 'System'
      },
      {
        url: 'https://i.imgflip.com/1bij.jpg',
        title: 'Default Meme 2',
        author: 'System'
      },
      {
        url: 'https://i.imgflip.com/1bij.jpg',
        title: 'Default Meme 3',
        author: 'System'
      }
    ];
  }
} 