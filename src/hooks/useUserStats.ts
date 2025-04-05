import {useQuery} from '@tanstack/react-query';
import {getCurrentUserProfile, getTopArtists} from '../api/user';

export const useUserStats = (token: string | null, timeRange: 'short_term' | 'medium_term' | 'long_term') => {
  const enabled = !!token;

  const userQuery = useQuery(['user-profile'], () => getCurrentUserProfile(token!), {enabled});

  const topArtistsQuery = useQuery(['top-artists', timeRange], () => getTopArtists(token!, 10, timeRange), {
    enabled,
  });

  return {
    user: userQuery.data,
    topArtists: topArtistsQuery.data,
    isLoading: userQuery.isLoading || topArtistsQuery.isLoading,
    isError: userQuery.isError || topArtistsQuery.isError,
  };
};
