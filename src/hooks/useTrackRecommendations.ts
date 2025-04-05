import {useQuery} from '@tanstack/react-query';
import {fetchTrackDetails, searchTracks} from '../api/tracks';
import {extractTrackId} from '../utils/extractTrackId';

const fetchRecommendations = async (token: string, tracksAmount: number,  songUrl: string) => {
    const trackId = extractTrackId(songUrl);
    if (!trackId) throw new Error('Invalid Spotify song URL');

    const {trackName, artistName} = await fetchTrackDetails(token, trackId);
    const recommendations = await searchTracks(token, artistName, trackName, tracksAmount);

    return {trackName, artistName, recommendations};
};

export const useTrackRecommendationsQuery = (songUrl: string | null, tracksAmount: number, token: string | null) => {
    return useQuery({
        queryKey: ['recommendations', songUrl],
        queryFn: () => {
            if (!songUrl || !token) throw new Error('Missing songUrl or token');
            return fetchRecommendations(token, tracksAmount, songUrl);
        },
        enabled: !!songUrl && !!token,
    });
};
