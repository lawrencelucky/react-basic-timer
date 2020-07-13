import React, { Component } from 'react';
import Header from './../Header/Header';
import Timer from '../Timer/Timer';
import Footer from './../Footer/Footer';

class TimerBuilder extends Component {
  state = {
    dark: false,
  };

  handleModeChange = () => {
    this.setState({ dark: !this.state.dark });
    localStorage.setItem('mode', this.state.dark);
  };

  render() {
    return (
      <div>
        <Header handleMode={this.handleModeChange} />
        <Timer />
        <Footer />
      </div>
    );
  }
}

export default TimerBuilder;
