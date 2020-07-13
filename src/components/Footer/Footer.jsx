import React from 'react';
import './Footer.scss';
import githubIcon from '../../assets/icons/github-icon.svg';
import twitterIcon from '../../assets/icons/twitter-icon.svg';
import linkedinIcon from '../../assets/icons/linkedin-icon.svg';

const Footer = () => {
  const mode = localStorage.getItem('mode');
  let classes = 'footer fixed-bottom';

  if (mode === 'true') {
    classes += ' dark';
  }

  return (
    <div className='footer-container'>
      <footer className={classes}>
        <div className='icons-container'>
          <a
            href='https://twitter.com/_lawrencelucky'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className='icon' src={twitterIcon} alt='twitter-icon' />
          </a>
          <a
            href='https://github.com/lawrencelucky/react-basic-timer'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className='icon' src={githubIcon} alt='github-icon' />
          </a>
          <a
            href='https://www.linkedin.com/in/lawrence-lucky/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className='icon' src={linkedinIcon} alt='linkedin-icon' />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
