'use client';

export default function MoodToggle({ mood, setMood }) {
  const toggleMood = () => {
    setMood(mood === 'chill' ? 'hype' : 'chill');
  };

  return (
    <button
      onClick={toggleMood}
      className={`relative px-4 py-2 rounded-full overflow-hidden transition-colors ${
        mood === 'chill' ? 'bg-pastel-blue' : 'bg-pastel-pink'
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {mood === 'chill' ? (
          <>
            <span>🌿</span>
            <span>Chill Mode</span>
          </>
        ) : (
          <>
            <span>⚡</span>
            <span>Hype Mode</span>
          </>
        )}
      </span>
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          mood === 'chill' ? 'bg-pastel-blue' : 'bg-pastel-pink'
        }`}
        style={{
          transform: mood === 'chill' ? 'scale(1)' : 'scale(1.2)',
        }}
      />
    </button>
  );
} 