
import {Dispatch, SetStateAction} from 'react';

export interface SpotifyArtist {
    id: string;
    name: string;
    popularity: number;
    genres?: string[];
    images?: { url: string }[];
  }
  
  export interface SpotifyAlbum {
    images: {
      url: string;
    }[];
  }
  
  export interface SpotifyTrack {
    id: string;
    name: string;
    popularity: number;
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
  }
  
  export interface RecommendationsResult {
    trackName: string;
    artistName: string;
    recommendations: SpotifyTrack[];
  }
  
  export interface SearchForm {
    songUrl: string;
    tracksAmount: number;
  }

  export interface SearchProps {
    onSearch: (data: SearchForm) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
  }


export interface ExportPlaylistModalProps {
    show: boolean;
    handleClose: () => void;
    tracks: SpotifyTrack[];
  }
  
  export interface PlaylistForm {
    playlistName: string;
    isPublic: boolean;
  }
  
  export type ToastVariant = 'success' | 'error';
  
  export interface ToastData {
    message: string;
    variant: ToastVariant;
  }

  export interface ToastNotificationProps {
    show: boolean;
    onClose: () => void;
    message: string;
    variant?: ToastVariant
  }

  export interface RecommendationProps {
    data: RecommendationsResult;
  }

 export interface SearchForm {
    songUrl: string;
    tracksAmount: number;
  }

  export interface TopTrackCardProps {
    track: SpotifyTrack;
  }

  export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

  export interface UserStatsModalProps {
    show: boolean;
    handleClose: () => void;
    token: string;
  }
  
  export interface SpotifyUserProfile {
    display_name: string;
    id: string;
    email: string;
    images: { url: string }[];
  }

  export interface ChartArtistData {
    name: string;
    popularity: number;
    color: string;
  }
  
