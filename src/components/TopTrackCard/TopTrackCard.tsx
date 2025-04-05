import React from 'react';
import {Card, Row, Col, ProgressBar} from 'react-bootstrap';
import type {TopTrackCardProps} from '../../types/types';
import './TopTrackCard.scss';

const TopTrackCard: React.FC<TopTrackCardProps> = ({track}) => {
  return (
    <Row className="justify-content-center mb-4">
      <Col md={3} sm={6} xs={12}>
        <h5 className="top-track-header">Based on:</h5>
        <Card className="top-track-card">
          <Card.Img
            variant="top"
            src={track.album.images[1]?.url}
            alt={track.name}
            className="top-track-img"
          />
          <Card.Body className="text-center p-2">
            <Card.Title className="top-track-title">{track.name}</Card.Title>
            <Card.Text className="top-track-artists">
              {track.artists.map((artist) => artist.name).join(', ')}
            </Card.Text>
            <Card.Text className="top-track-pop-label">Popularity</Card.Text>
            <ProgressBar
              now={track.popularity}
              label={`${track.popularity}/100`}
              variant="success"
              className="top-track-progress"
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TopTrackCard;
