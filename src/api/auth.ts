const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-top-read'
].join(' ');

export const generateSpotifyLoginUrl = () => {
    const params = new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: 'token', 
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
        show_dialog: 'true',
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
};
