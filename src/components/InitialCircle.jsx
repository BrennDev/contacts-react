import React, { Component } from 'react';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
