import React from 'react';
import './Header.scss';
import moonIcon from '../../assets//icons/moon-icon.svg';
import sunIcon from '../../assets/icons/sun-icon.svg';

const Header = ({ handleMode }) => {
  const mode = localStorage.getItem('mode');
  let img = <img className='icon' src={moonIcon} alt='moon-icon' />;
  let classes = 'header fixed-top';

  if (mode === 'true') {
    img = <img className='icon' src={sunIcon} alt='sun-icon' />;
    classes += ' dark';
  }

  return (
    <div className='header-container'>
      <header className={classes}>
        <h2>Simple Timer</h2>
        <div onClick={handleMode} className='icons-container'>
          {img}
        </div>
      </header>
    </div>
  );
};

export default Header;
