import React from 'react';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import TextsmsIcon from '@mui/icons-material/Textsms';
import LockResetIcon from '@mui/icons-material/LockReset';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import StorageIcon from '@mui/icons-material/Storage';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './left-sidebar.css';

const LeftSidebar = () => {
  const links = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Calendar', icon: <CalendarTodayIcon /> },
    { text: 'Todo', icon: <AssignmentTurnedInIcon /> },
    { text: 'Study Allocator', icon: <StorageIcon /> },
    { text: 'Document Builder', icon: <AssignmentTurnedInIcon /> },
    { text: 'Videos', icon: <VideoLibraryIcon /> },
    { text: 'USMLE Step 1', icon: <MenuBookIcon /> },
  ];

  return (
    <>
      <div className='sidebar1'>
        <div className="left-bar-header">
          <div className="logo-section">
            <a href='/'>
            <img src="./dashboardFevicon.png" alt="Favicon" className="favicon" />
            </a>
          </div>
        </div>

        <div className="left-sidebar">
          <div className="user-credential">
            <div className="user-info">
              <span className="user-avatar">SI</span>
              <span className="user-name">shabnam ikram</span>
              <a href="#" className="edit-profile">Edit Profile</a>
            </div>
          </div>
          <div className="links">
            {links.map((link, index) => (
              <a href="#" key={index} className="sidebar-link">
                <span className="link-icon">{link.icon}</span>
                {link.text}
              </a>
            ))}
          </div>
          <div className="left-sidebar-footer">
            <span><a href="#"><SettingsSharpIcon /></a></span>
            <span><a href="#"><TextsmsIcon /></a></span>
            <span><a href="#"><LockResetIcon /></a></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
