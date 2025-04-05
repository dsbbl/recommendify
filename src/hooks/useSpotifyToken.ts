import {useState, useEffect} from 'react';
import {isTokenExpired} from '../utils/checkTokenValidity';

const useSpotifyToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const params = new URLSearchParams(hash.replace('#', ''));
      const accessToken = params.get('access_token');
      const expiresIn = Number(params.get('expires_in') || 3600);

      if (accessToken) {
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem('spotify_access_token', accessToken);
        localStorage.setItem('spotify_token_expiry', expirationTime.toString());
        setToken(accessToken);
        window.location.hash = '';
        return;
      }
    }

    const storedToken = localStorage.getItem('spotify_access_token');
    if (storedToken && !isTokenExpired()) {
      setToken(storedToken);
    } else {
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_token_expiry');
    }
  }, []);

  return token;
};

export default useSpotifyToken;
