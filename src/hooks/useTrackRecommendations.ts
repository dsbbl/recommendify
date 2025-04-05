import {useQuery} from '@tanstack/react-query';
import {fetchTrackDetails, searchTracks} from '../api/tracks';
import {extractTrackId} from '../utils/extractTrackId';
import type {SpotifyTrack} from '../types/types';

const normalize = (text: string): string =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

const fetchRecommendations = async (
  token: string,
  tracksAmount: number,
  songUrl: string
) => {
  const trackId = extractTrackId(songUrl);
  if (!trackId) throw new Error('Invalid Spotify song URL');

  const {trackName, artistName} = await fetchTrackDetails(token, trackId);

  const buffer = 15;
  const results = await searchTracks(token, artistName, trackName, tracksAmount + buffer);

  const normalizedSeedName = normalize(trackName);
  const seen = new Set<string>();

  const filtered = results.filter((track: SpotifyTrack) => {
    const normalizedName = normalize(track.name);
    const isDuplicate = seen.has(normalizedName);
    seen.add(normalizedName);

    return !normalizedName.includes(normalizedSeedName) && !isDuplicate;
  });

  const finalRecommendations = filtered.slice(0, tracksAmount);

  return {trackName, artistName, recommendations: finalRecommendations};
};

export const useTrackRecommendationsQuery = (
  songUrl: string | null,
  tracksAmount: number,
  token: string | null
) => {
  return useQuery({
    queryKey: ['recommendations', songUrl, tracksAmount],
    queryFn: () => {
      if (!songUrl || !token) throw new Error('Missing songUrl or token');
      return fetchRecommendations(token, tracksAmount, songUrl);
    },
    enabled: !!songUrl && !!token,
  });
};
