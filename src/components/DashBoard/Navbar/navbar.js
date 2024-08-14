import React from 'react';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArchiveIcon from '@mui/icons-material/Archive';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-menu'>
        <ul className='nav-items'>
          <li className='chat-icon'>
            <a href='#'>
              <SmsRoundedIcon />
            </a>
          </li>
          <li className='clipboard-icon'>
            <a href='#'>
              <AssignmentTurnedInIcon />
            </a>
          </li>
          <li id='support-icon'>
            <a href='#'>
              <img src='./support-nav.png' alt='Support'/>
            </a>
          </li>
          <li id='upgrade-icon'>
            <a href='#'>
              <img src='./upgrade-nav.png' alt='Upgrade'/>
            </a>
          </li>
        </ul>
      </div>

      <div className='right-side-nav-menu'>
        <ul className='nav-items'>
          <li className='profile-icon'>
            <a href='#'>
              <AccountCircleIcon />
            </a>
          </li>
          <li className='box-icon'>
            <a href='#'>
              <ArchiveIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
