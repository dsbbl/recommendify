import React, {useState} from 'react';
import {Modal, Button, Form, Spinner} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {createPlaylist, addTracksToPlaylist} from '../../api/playlist';
import ToastNotification from '../ToastNotification/ToastNotification';
import type {ExportPlaylistModalProps, PlaylistForm, ToastData} from '../../types/types';
import './ExportPlaylistModal.scss';

const ExportPlaylistModal: React.FC<ExportPlaylistModalProps> = ({show, handleClose, tracks}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PlaylistForm>();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  const onSubmit = async (data: PlaylistForm) => {
    setLoading(true);
    setToast(null);
  
    try {
      const accessToken = localStorage.getItem('spotify_access_token');
      if (!accessToken) throw new Error('User not authenticated with Spotify.');
  
      const playlistData = await createPlaylist(data.playlistName, data.isPublic, accessToken);
      const trackUris = tracks.map((track) => `spotify:track:${track.id}`);
      await addTracksToPlaylist(playlistData.id, trackUris, accessToken);
  
      setToast({message: `Playlist "${data.playlistName}" exported successfully!`, variant: 'success'});
      handleClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setToast({message: err.message, variant: 'error'});
      } else {
        setToast({message: 'Failed to export playlist.', variant: 'error'});
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="export-modal">
        <Modal.Header closeButton className="export-modal__header">
          <Modal.Title>Export Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body className="export-modal__body">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter playlist name"
                {...register('playlistName', {
                  required: 'Playlist name is required',
                  minLength: {value: 2, message: 'Too short!'},
                })}
                className={`export-modal__input ${errors.playlistName ? 'is-invalid' : ''}`}
              />
              {errors.playlistName && (
                <Form.Text className="text-danger">{errors.playlistName.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Make playlist public"
                {...register('isPublic')}
                className="export-modal__checkbox"
              />
            </Form.Group>

            <Button variant="success" type="submit" disabled={loading} className="w-100">
              {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Export to Spotify'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {toast && (
        <ToastNotification
          show={!!toast}
          onClose={() => setToast(null)}
          message={toast.message}
          variant={toast.variant}
        />
      )}
    </>
  );
};

export default ExportPlaylistModal;
