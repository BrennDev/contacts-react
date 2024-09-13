import { Component } from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

class ErrorMessage extends Component {
  render() {
    const { error, onClose } = this.props;

    if (!error) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Action could not be completed</h2>
          <p>{error}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorMessage;
