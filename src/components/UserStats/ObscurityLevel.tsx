
import React from 'react';
import type {SpotifyArtist} from '../../types/types';
import './ObscurityLevel.scss';

interface ObscurityLevelProps {
  topArtists: SpotifyArtist[];
}

const ObscurityLevel: React.FC<ObscurityLevelProps> = ({topArtists}) => {
  if (!topArtists.length) return null;

  const avgPopularity = Math.round(
    topArtists.reduce((sum, artist) => sum + artist.popularity, 0) / topArtists.length
  );

  let level = '';
  let description = '';

  if (avgPopularity <= 20) {
    level = '🧙‍♂️ Arcane Vibes Seeker';
    description = 'Even Spotify had to Google who you’re listening to.';
  } else if (avgPopularity <= 40) {
    level = '🔮 Indie Oracle';
    description = 'You discovered your favorite band on a Tumblr post from 2013';
  } else if (avgPopularity <= 60) {
    level = '🌀 Balanced Banger Hunter';
    description = 'You vibe with both TikTok hits and that one band with 1k listeners.';
  } else if (avgPopularity <= 80) {
    level = '💅 Certified Pop Enjoyer';
    description = 'Your playlist is basically a teenager’s gym routine.';
  } else if (avgPopularity <= 94) {
    level = '🍼 Spotify’s Favorite Child';
    description = 'When your phone connects to a speaker, it just starts playing `Blinding Lights`.';
  } else {
    level = '🥶 White-Girl Brunchcore';
    description = 'You unironically add ✨vibes✨ to every playlist name.';
  }
 
  return (
    <div className="obscurity-container">
      <h6 className="obscurity-title">How Obscure Is Your Taste?</h6>
      <p className="obscurity-level">{level}</p>
      <p className="obscurity-desc">{description}*</p>
      <p className="obscurity-score">Average Popularity: {avgPopularity}/100</p>
      <p className='obscurity-disclaimer'>*The obscurity level is based on the average popularity of your top artists. Don’t take it too seriously - it’s just for fun and definitely not a scientific metric. Peace! ✌️</p>
    </div>
  );
};

export default ObscurityLevel;
