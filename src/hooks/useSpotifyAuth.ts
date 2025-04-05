import {generateSpotifyLoginUrl} from '../api/auth';

export const useSpotifyAuth = () => {
    const login = () => {
        window.location.href = generateSpotifyLoginUrl();
    };

    return {login};
};
