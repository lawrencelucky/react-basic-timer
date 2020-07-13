import React, { Component } from 'react';
import './Timer.scss';
import startIcon from '../../assets/icons/start-icon.svg';
import pauseIcon from '../../assets/icons/pause-icon.svg';
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

    if (e.target.value > 86400) {
      alert('You should not exceed 24 hours!');
      return;
    }

    if (e.target.value === '' || regex.test(e.target.value)) {
      let timer = e.target.value;
      let seconds = timer % 60;
      let minutes = Math.floor((timer / 60) % 60);
      let hours = Math.floor(timer / 3600);
      this.setState({ timer, seconds, minutes, hours });
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
    this.countdown(this.state.timer);
  };

  pauseTimerHandler = () => {
    this.setState({ start: false });
  };

  refreshTimerHandler = () => {
    if (this.state.start === true || this.state.timer > 0) {
      this.setState({
        start: false,
        timer: 0,
        minutes: 0,
        seconds: 0,
        hours: 0,
      });
    }
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

    const mode = localStorage.getItem('mode');
    let darkClass = 'timer-container';
    let classes = 'set-timer-container';
    if (this.state.start === true) {
      classes += ' timer-started';
    }

    if (mode === 'true') {
      darkClass += ' dark';
    }

    return (
      <div className={darkClass}>
        <div className='content-container'>
          <div className={classes}>
            <h2>
              {this.state.hours <= 9 ? hrs : this.state.hours} :{' '}
              {this.state.minutes <= 9 ? mins : this.state.minutes} :{' '}
              {this.state.seconds <= 9 ? secs : this.state.seconds}
            </h2>
            <div className='input-container'>
              <input
                type='text'
                value={this.state.timer}
                placeholder='0'
                onChange={this.inputChangeHandler}
                onKeyDown={this.clearInputHandler}
                autoFocus
              />
            </div>
          </div>
          <div className='icons-container '>
            {!this.state.start ? (
              <img
                className='icon start-icon'
                src={startIcon}
                alt='start-icon'
                onClick={this.startTimerHandler}
              />
            ) : (
              <img
                className='icon pause-icon'
                src={pauseIcon}
                alt='pause-icon'
                onClick={this.pauseTimerHandler}
              />
            )}
            <div className='line'></div>
            <img
              className='icon'
              src={refreshIcon}
              alt='refresh-icon'
              onClick={this.refreshTimerHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
