import React from 'react';
import './Header.scss';
import moonIcon from '../../assets//icons/moon-icon.svg';
import sunIcon from '../../assets/icons/sun-icon.svg';

const Header = ({ handleMode }) => {
  const mode = localStorage.getItem('mode');
  let img = <img className='icon' src={moonIcon} alt='moon-icon' />;

  if (mode === 'true') {
    img = <img className='icon' src={sunIcon} alt='sun-icon' />;
  }

  return (
    <div className='header-container'>
      <header className='header fixed-top'>
        <h2>Simple Timer</h2>
        <div onClick={handleMode} className='icons-container'>
          {img}
        </div>
      </header>
    </div>
  );
};

export default Header;
