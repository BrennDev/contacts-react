import { Component } from 'react';
import './LoadingSpinner.css';
import PropTypes from 'prop-types';

class LoadingSpinner extends Component {
  render() {
    const { message = 'Loading...' } = this.props;
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    );
  }
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

export default LoadingSpinner;
