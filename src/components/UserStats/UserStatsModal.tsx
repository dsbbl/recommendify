import {Modal, Button, Spinner, Dropdown} from 'react-bootstrap';
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from 'recharts';
import {useState} from 'react';
import {useUserStats} from '../../hooks/useUserStats';
import ObscurityLevel from './ObscurityLevel';
import type {UserStatsModalProps, TimeRange, SpotifyArtist, ChartArtistData} from '../../types/types';
import './UserStatsModal.scss';

const timeRangeOptions = [
  {label: 'Last 4 weeks', value: 'short_term'},
  {label: 'Last 6 months', value: 'medium_term'},
  {label: 'All time', value: 'long_term'},
];

const UserStatsModal: React.FC<UserStatsModalProps> = ({show, handleClose, token}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('medium_term');
  const {user, topArtists, isLoading} = useUserStats(token, timeRange);

  const chartData =
    topArtists?.map((artist: SpotifyArtist) => ({
      name: artist.name,
      popularity: artist.popularity,
      color: '#1DB954',
    })) || [];

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="stats-modal">
      <Modal.Header>
        <Modal.Title>🎧 Hey {user?.display_name}, we know what you love!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isLoading ? (
          <div className="spinner-container">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <>
            <div className="dropdown-wrapper">
              <Dropdown onSelect={(val) => setTimeRange(val as TimeRange)}>
                <Dropdown.Toggle variant="outline-light" size="sm">
                  {timeRangeOptions.find((opt) => opt.value === timeRange)?.label}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {timeRangeOptions.map((opt) => (
                    <Dropdown.Item key={opt.value} eventKey={opt.value}>
                      {opt.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <h5 className="chart-title">Your Top Artists</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={chartData} margin={{left: 50}}>
                <XAxis type="number" stroke="#fff" />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#fff"
                  width={120}
                  tick={{fontSize: 12, fill: '#fff'}}
                  interval={0}
                />
                <Tooltip />
                <Bar dataKey="popularity">
                  {chartData.map((entry: ChartArtistData, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <ObscurityLevel topArtists={topArtists} />
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" className="close-stats-button" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserStatsModal;
