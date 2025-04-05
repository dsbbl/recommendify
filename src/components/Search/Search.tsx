import {useForm} from 'react-hook-form';
import type {SearchForm, SearchProps} from '../../types/types';
import './Search.scss';

const validateSpotifyUrl = (url: string) => {
  const regex = /^(https:\/\/open\.spotify\.com\/track\/|spotify:track:)[A-Za-z0-9]+/;
  return regex.test(url);
};

export default function Search({onSearch}: SearchProps) {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<SearchForm>({mode: 'onSubmit'});

  const onSubmit = (data: SearchForm) => {
    onSearch(data);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        className={`search-input ${errors.songUrl ? 'invalid' : ''}`}
        placeholder="Spotify Song URL"
        {...register('songUrl', {
          required: 'This field is required!',
          validate: (value) =>
            validateSpotifyUrl(value) || 'Please enter a valid Spotify track URL',
        })}
      />
      {errors.songUrl && <p className="error-message">{errors.songUrl.message}</p>}

      <input
        type="number"
        min="1"
        step="1"
        className={`track-amount-input ${errors.tracksAmount ? 'invalid' : ''}`}
        placeholder="Number of tracks (1–50)"  
        onKeyDown={(e) => {
          if (['-', 'e', 'E', '+', '.'].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value;
          if (value !== '' && parseInt(value) < 1) {
            (e.target as HTMLInputElement).value = '1';
          }
        }}
        {...register('tracksAmount', {
          required: 'Please provide a number of tracks',
          min: {value: 1, message: 'Minimum is 1 track'},
          max: {value: 50, message: 'Maximum is 50 tracks'},
          valueAsNumber: true,
        })}
      />
      {errors.tracksAmount && <p className="error-message">{errors.tracksAmount.message}</p>}

      <button className="search-button" type="submit" disabled={isSubmitting}>
        Search
      </button>
    </form>
  );
}
