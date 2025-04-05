import {useQuery} from '@tanstack/react-query';
import {fetchTrackDetails, searchTracks} from '../api/tracks';
import {extractTrackId} from '../utils/extractTrackId';
import type {SpotifyTrack, RecommendationsResult} from '../types/types';

const normalize = (text: string): string =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

const filterDuplicatesAndMatches = (
  tracks: SpotifyTrack[],
  seedName: string
): SpotifyTrack[] => {
  const seen = new Set<string>();
  const normalizedSeedName = normalize(seedName);

  return tracks.filter((track) => {
    const normalizedName = normalize(track.name);
    const isDuplicate = seen.has(normalizedName);
    seen.add(normalizedName);

    return !normalizedName.includes(normalizedSeedName) && !isDuplicate;
  });
};

const reduceSameArtistTracks = (
  tracks: SpotifyTrack[],
  artistName: string,
  keepRatio: number = 0.25
): SpotifyTrack[] => {
  const sameArtist = tracks.filter((track) =>
    track.artists.some((artist) => artist.name.toLowerCase() === artistName.toLowerCase())
  );

  const numToKeep = Math.max(1, Math.floor(sameArtist.length * keepRatio));
  const keptSameArtist = sameArtist
    .sort(() => 0.5 - Math.random())
    .slice(0, numToKeep);
  const keptIds = new Set(keptSameArtist.map((track) => track.id));

  return tracks.filter((track) => {
    const isSame = track.artists.some(
      (artist) => artist.name.toLowerCase() === artistName.toLowerCase()
    );
    return !isSame || keptIds.has(track.id);
  });
};

export const fetchRecommendations = async (
  token: string,
  tracksAmount: number,
  songUrl: string
): Promise<RecommendationsResult> => {
  const trackId = extractTrackId(songUrl);
  if (!trackId) throw new Error('Invalid Spotify song URL');

  const {trackName, artistName} = await fetchTrackDetails(token, trackId);

  const buffer = 15
  const results = await searchTracks(token, artistName, trackName, tracksAmount + buffer);

  let filtered = filterDuplicatesAndMatches(results, trackName);
  filtered = reduceSameArtistTracks(filtered, artistName);

  return {
    trackName,
    artistName,
    recommendations: filtered.slice(0, tracksAmount),
  };
};


export const useTrackRecommendationsQuery = (
  songUrl: string | null,
  tracksAmount: number,
  token: string | null
) => {
  return useQuery<RecommendationsResult>({
    queryKey: ['recommendations', songUrl, tracksAmount],
    queryFn: () => {
      if (!songUrl || !token) throw new Error('Missing songUrl or token');
      return fetchRecommendations(token, tracksAmount, songUrl);
    },
    enabled: !!songUrl && !!token,
  });
};
