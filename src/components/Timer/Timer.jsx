import React, { Component } from 'react';
import './Timer.scss';
import startIcon from '../../assets/icons/start-icon.svg';
import pauseIcon from '../../assets/icons/pause-icon.svg';
import stopIcon from '../../assets/icons/stop-icon.svg';
import refreshIcon from '../../assets/icons/refresh-icon.svg';

class Timer extends Component {
  state = {
    timer: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    start: false,
  };

  inputChangeHandler = (e) => {
    const regex = /^[0-9\b]+$/;

    if (e.target.value === '' || regex.test(e.target.value)) {
      let timer = e.target.value;
      let seconds = timer % 60;
      let minutes = Math.floor((timer / 60) % 60);
      let hours = Math.floor(timer / 3600);
      this.setState({ timer, seconds, minutes, hours });
      localStorage.setItem('timer', e.target.value);
    }
  };

  countdown = (time) => {
    const timerId = setInterval(() => {
      if (this.state.start === true) {
        time = time - 1;
        const seconds = time % 60;
        const minutes = Math.floor((time / 60) % 60);
        const hours = Math.floor(time / 3600);
        this.setState({
          timer: time,
          seconds,
          minutes,
          hours,
        });
      }

      if (this.state.timer <= 0 || this.state.start === false) {
        clearInterval(timerId);
        this.setState({ start: false });
      }
    }, 1000);
  };

  startTimerHandler = () => {
    if (this.state.timer <= 0) return;
    this.setState({ start: true });
    let time = localStorage.getItem('timer');
    this.countdown(time);
  };

  pauseTimerHandler = () => {
    this.setState({ start: false });
  };

  stopTimerHandler = () => {
    if (this.state.start === true) {
      this.setState({
        start: false,
        timer: 0,
        minutes: 0,
        seconds: 0,
        hours: 0,
      });
    }
  };

  refreshTimerHandler = () => {
    let time = localStorage.getItem('timer');
    this.stopTimerHandler();
    this.startTimerHandler();
    this.countdown(time);
  };

  clearInputHandler = (e) => {
    if (this.state.timer <= 0) {
      e.target.value = '';
    }
  };

  render() {
    let hrs = '';
    if (this.state.hours < 10) {
      hrs = `0${this.state.hours}`;
    }
    let mins = '';
    if (this.state.minutes < 10) {
      mins = `0${this.state.minutes}`;
    }
    let secs = '';
    if (this.state.seconds < 10) {
      secs = `0${this.state.seconds}`;
    }

    return (
      <div className='timer-container'>
        <h2>
          {this.state.hours <= 9 ? hrs : this.state.hours} :{' '}
          {this.state.minutes <= 9 ? mins : this.state.minutes} :{' '}
          {this.state.seconds <= 9 ? secs : this.state.seconds}
        </h2>
        <input
          type='text'
          value={this.state.timer}
          placeholder='0'
          onChange={this.inputChangeHandler}
          onKeyDown={this.clearInputHandler}
        />
        <div className='icons-container'>
          {!this.state.start ? (
            <button>
              <img
                className='icon'
                src={startIcon}
                alt='start-icon'
                onClick={this.startTimerHandler}
              />
            </button>
          ) : (
            <button>
              <img
                className='icon'
                src={pauseIcon}
                alt='pause-icon'
                onClick={this.pauseTimerHandler}
              />
            </button>
          )}
          <button>
            <img
              className='icon'
              src={stopIcon}
              alt='stop-icon'
              onClick={this.stopTimerHandler}
            />
          </button>
          <button>
            <img
              className='icon'
              src={refreshIcon}
              alt='refresh-icon'
              onClick={this.refreshTimerHandler}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
