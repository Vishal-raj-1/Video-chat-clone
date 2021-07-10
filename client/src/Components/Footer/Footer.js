import React from 'react';
import './Footer.css';
import heartIcon from '../../assets/heart.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
const Footer = () => {
  return (
    <div className='footer'>
      <p>
        Made with <img src={heartIcon} alt='heart'></img> by Krish
      </p>
      <div className='icons'>
        <a href='https://github.com/krish-1806' className='githubIcon'>
          <GitHubIcon />
        </a>
        <a href='https://www.linkedin.com/in/krish-1a4690190' className='linkIcon'>
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
};
export default Footer;
