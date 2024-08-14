import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // Import default DayPicker styles
import './rightBar.css'; // Import your custom CSS file
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import RemoveIcon from '@mui/icons-material/Remove';

const RightSidebar = ({ tasks = [] }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="right-sidebar">
      <div className='divider'>
        <div className='quote'>
           <h4 className='icon'>
            <span style={{ color: '#3a70d4' }}>
              <FormatQuoteRoundedIcon style={{ transform: 'scaleX(-1)' }} />
            </span>
            Some people want it to happen, some wish it would happen, others make it happen.
          </h4>
          <h3>
            <span style={{ color: '#3a70d4' }}>
              <RemoveIcon />
            </span>
            Michael Jordan
          </h3>
        </div>
        <div className='calendar'>
          <p>Calendar</p>

          <DayPicker
            selected={selected} 
            onSelect={setSelected} 
            mode="single" 
          />
        </div>
        <h2>Tasks</h2>
        <ul className="tasks">
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
