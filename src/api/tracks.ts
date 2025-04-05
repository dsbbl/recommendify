import axios from 'axios';

// Fetch track details (artist & track name) from track ID
export const fetchTrackDetails = async (token: string, trackId: string) => {
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const track = response.data;

    return {
        trackName: track.name,
        artistName: track.artists[0]?.name ?? '',
    };
};

export const getSeedTrack = async (token: string, trackId: string) => {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('❌ Error fetching seed track details:', error);
        return null;
    }
};

// Search for similar tracks using the track + artist name as query
export const searchTracks = async (token: string, artistName: string, trackName: string, tracksAmount: number) => {
    const query = encodeURIComponent(`${artistName} ${trackName}`);
    const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: query,
            type: 'track',
            limit: tracksAmount,
        }
    });

    return response.data.tracks.items;
};
