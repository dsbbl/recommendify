import {useState, useEffect} from 'react';
import {useSpotifyAuth} from '../hooks/useSpotifyAuth';
import {useTrackRecommendationsQuery} from '../hooks/useTrackRecommendations';
import {getSeedTrack} from '../api/tracks';
import {Container, Button, Spinner} from 'react-bootstrap';
import Recommendations from '../components/Recommendations/Recommendations';
import Search from '../components/Search/Search';
import TopTrackCard from '../components/TopTrackCard/TopTrackCard';
import useSpotifyToken from '../hooks/useSpotifyToken';
import UserStatsModal from '../components/UserStats/UserStatsModal';
import StatsButton from '../components/StatsButton/StatsButton';
import {SpotifyTrack, SearchForm} from '../types/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.scss';

function Main() {
  const {login} = useSpotifyAuth();
  const token = useSpotifyToken();

  const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null);
  const [tracksAmount, setTracksAmount] = useState<number>(0);
  const [seedTrack, setSeedTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);

  const {data} = useTrackRecommendationsQuery(currentSongUrl, tracksAmount, token);

  useEffect(() => {
    const fetchSeed = async () => {
      if (!currentSongUrl || !token) return;

      setLoading(true);
      const trackId = currentSongUrl.match(/(?:track\/|spotify:track:)([A-Za-z0-9]+)/)?.[1];

      if (trackId) {
        try {
          const track = await getSeedTrack(token, trackId);
          setSeedTrack(track);
        } catch {
          setSeedTrack(null);
        }
      }

      setLoading(false);
    };

    fetchSeed();
  }, [currentSongUrl, token]);

  const handleSearch = ({songUrl, tracksAmount}: SearchForm) => {
    setCurrentSongUrl(songUrl);
    setTracksAmount(tracksAmount);
  };

  return (
    <Container fluid className="main-container">
      <Container className="main-content">
        <h2 className="main-title">Discover Your Next Favorite Song</h2>
        <p className="main-subtitle">
          Enter a song you love, and we'll find the perfect recommendations for you.
        </p>

        {!token ? (
          <Button variant="success" size="lg" onClick={login}>
            Sign in and connect with Spotify
          </Button>
        ) : (
          <Search onSearch={handleSearch} setLoading={setLoading} />
        )}
      </Container>

      {loading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      {!loading && token && seedTrack && <TopTrackCard track={seedTrack} />}
      {!loading && token && data && <Recommendations data={data} />}

      {token && (
        <>
          <StatsButton onClick={() => setShowStats(true)} />
          <UserStatsModal show={showStats} handleClose={() => setShowStats(false)} token={token} />
        </>
      )}
    </Container>
  );
}

export default Main;
