import React, { Component } from 'react';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  const randomHex = () => letters[Math.floor(Math.random() * letters.length)];

  return `#${Array.from({ length: 6 }, randomHex).join('')}`;
}

class InitialCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '',
    };
  }

  componentDidMount() {
    const backgroundColor = getRandomColor();
    this.setState({ backgroundColor });
  }

  render() {
    const { firstName } = this.props;
    const { backgroundColor } = this.state;

    return (
      <div className="initial-circle" style={{ backgroundColor }}>
        {firstName.charAt(0).toUpperCase()}
      </div>
    );
  }
}

export default InitialCircle;
