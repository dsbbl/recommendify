import React, {useState} from 'react';
import {Container, Row, Col, Card, Button, ProgressBar} from 'react-bootstrap';
import ExportPlaylistModal from '../ExportPlaylistModal/ExportPlaylistModal';
import type {RecommendationProps} from '../../types/types';
import './Recommendations.scss';

const Recommendations: React.FC<RecommendationProps> = ({data}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container className="recommendations">
      <h3 className="recommendations__title">Recommended Tracks</h3>

      <Row className="justify-content-center">
        {data.recommendations.map((track) => (
          <Col md={3} sm={6} xs={12} key={track.id} className="recommendations__card-wrapper">
            <Card className="recommendations__card">
              <Card.Img
                variant="top"
                src={track.album.images[1]?.url}
                alt={track.name}
                className="recommendations__image"
              />
              <Card.Body className="recommendations__body">
                <Card.Title className="recommendations__track-title">{track.name}</Card.Title>
                <Card.Text className="recommendations__artist">
                  {track.artists.map((a) => a.name).join(', ')}
                </Card.Text>
                <Card.Text className="recommendations__popularity-label">Popularity</Card.Text>
                <div className="recommendations__progress-wrapper">
                    <div className="recommendations__progress-label">
                        {track.popularity}/100
                    </div>
                    <ProgressBar
                        now={track.popularity}
                        variant="success"
                        className="recommendations__progress"
                    />
                    </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="recommendations__button-wrapper">
        <Button className="recommendations__button" size="sm" onClick={() => setShowModal(true)}>
          Add to my playlist!
        </Button>
      </div>

      <ExportPlaylistModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        tracks={data.recommendations}
      />
    </Container>
  );
};

export default Recommendations;
