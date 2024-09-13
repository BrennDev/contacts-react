import { Component } from 'react';
import './LoadingSpinner.css';

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

export default LoadingSpinner;
