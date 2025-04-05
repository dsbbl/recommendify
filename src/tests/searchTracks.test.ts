import {describe, it, expect, vi} from 'vitest';
import axios from 'axios';
import {searchTracks} from '../api/tracks';

vi.mock('axios');

describe('searchTracks', () => {
  it('calls Spotify search API and returns tracks', async () => {
    const mockTracks = [{name: 'Song 1'}, {name: 'Song 2'}];

    const mockedGet = axios.get as unknown as ReturnType<typeof vi.fn>;

    mockedGet.mockResolvedValue({
      data: {tracks: {items: mockTracks}},
    });

    const result = await searchTracks('fake-token', 'Artist', 'Track', 10);

    expect(result).toEqual(mockTracks);
    expect(mockedGet).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/search',
      expect.objectContaining({
        headers: {Authorization: 'Bearer fake-token'},
      })
    );
  });
});
