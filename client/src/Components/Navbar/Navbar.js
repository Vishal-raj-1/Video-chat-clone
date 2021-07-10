import React from 'react';
import homeIcon from '../../assets/video-call.png';
import { APP_NAME } from '../../constants';
import './Navbar.css';
import StarIcon from '@material-ui/icons/Star';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='title-div'>
        <img src={homeIcon} alt='' />
        <h3>{APP_NAME}</h3>
      </div>
    </div>
  );
};

export default Navbar;
