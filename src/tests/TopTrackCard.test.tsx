import {render, screen} from '@testing-library/react';
import TopTrackCard from '../components/TopTrackCard/TopTrackCard';
import {describe, it, expect} from 'vitest';
import '@testing-library/jest-dom';
import {SpotifyTrack} from '../types/types'; // użyj typów, jeśli chcesz

describe('TopTrackCard', () => {
  const mockTrack: SpotifyTrack = {
    id: '1',
    name: 'Test Song',
    popularity: 70,
    album: {
      images: [{url: 'https://via.placeholder.com/150'}],
    },
    artists: [
      {id: 'a1', name: 'Artist 1', popularity: 60},
      {id: 'a2', name: 'Artist 2', popularity: 30},
    ],
  };

  it('displays track info', () => {
    render(<TopTrackCard track={mockTrack} />);
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Artist 1, Artist 2')).toBeInTheDocument();
    expect(screen.getByText('Popularity')).toBeInTheDocument();
  });
});
