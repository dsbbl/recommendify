import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../components/Search/Search';
import {describe, it, expect, vi} from 'vitest';
import '@testing-library/jest-dom';

describe('Search component', () => {
  it('renders input fields and search button', () => {
    render(
      <Search 
        onSearch={() => {}} 
        setLoading={() => {}} 
      />
    );

    expect(screen.getByPlaceholderText('Spotify Song URL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Number of tracks (1–50)')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Search'})).toBeInTheDocument();
  });

  it('calls onSearch with correct data', async () => {
    const mockSearch = vi.fn();
    const mockSetLoading = vi.fn();

    render(<Search onSearch={mockSearch} setLoading={mockSetLoading} />);

    await userEvent.type(screen.getByPlaceholderText('Spotify Song URL'), 'https://open.spotify.com/track/123');
    await userEvent.type(screen.getByPlaceholderText('Number of tracks (1–50)'), '5');
    await userEvent.click(screen.getByRole('button', {name: 'Search'}));

    expect(mockSearch).toHaveBeenCalledWith({
      songUrl: 'https://open.spotify.com/track/123',
      tracksAmount: 5,
    });
  });
});
