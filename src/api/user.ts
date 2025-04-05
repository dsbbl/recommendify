import axios from 'axios';

export const getCurrentUserProfile = async (token: string) => {
  const res = await axios.get('https://api.spotify.com/v1/me', {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res.data;
};

export const getTopArtists = async (
  token: string,
  limit = 5,
  time_range: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
) => {
  const res = await axios.get('https://api.spotify.com/v1/me/top/artists', {
    headers: {Authorization: `Bearer ${token}`},
    params: {limit, time_range},
  });
  return res.data.items;
};
