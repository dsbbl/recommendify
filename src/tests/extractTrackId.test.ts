import {describe, it, expect} from 'vitest';
import {extractTrackId} from '../utils/extractTrackId';

describe('extractTrackId', () => {
  it('should return track ID from a valid Spotify URL', () => {
    const url = 'https://open.spotify.com/track/12345abcde';
    expect(extractTrackId(url)).toBe('12345abcde');
  });

  it('should return null for invalid URL', () => {
    const url = 'https://open.spotify.com/album/67890xyz';
    expect(extractTrackId(url)).toBeNull();
  });
});
