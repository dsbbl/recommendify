import {describe, it, expect, vi} from 'vitest';
import axios from 'axios';
import {fetchTrackDetails} from '../api/tracks';

vi.mock('axios');
const mockedAxios = axios;

describe('fetchTrackDetails', () => {
  it('returns track and artist name from Spotify response', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({
      data: {
        name: 'Test Song',
        artists: [{name: 'Test Artist'}]
      }
    });

    const result = await fetchTrackDetails('fake_token', '123');
    expect(result).toEqual({trackName: 'Test Song', artistName: 'Test Artist'});
  });
});
