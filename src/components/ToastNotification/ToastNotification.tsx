import {Toast} from 'react-bootstrap';
import type {ToastNotificationProps} from '../../types/types';
import './ToastNotification.scss';

const ToastNotification = ({show, onClose, message, variant = 'success'}: ToastNotificationProps) => {
  return (
    <div className="custom-toast-wrapper">
      <Toast onClose={onClose} show={show} delay={2000} autohide>
        <Toast.Body className={`toast-body ${variant}`}>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastNotification;
