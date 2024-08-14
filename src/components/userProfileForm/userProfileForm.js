import React, { useState } from 'react';
import { TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem, Button, InputLabel } from '@mui/material';

const UserForm = () => {
  const [heardAboutUs, setHeardAboutUs] = useState('');
  const [otherSource, setOtherSource] = useState('');

  const handleHeardAboutUsChange = (event) => {
    setHeardAboutUs(event.target.value);
  };

  return (
    <form>
      <TextField label="First Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Middle Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Last Name" variant="outlined" fullWidth margin="normal" />
      
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Sex</FormLabel>
        <RadioGroup row>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel value="preferNotToSay" control={<Radio />} label="Prefer not to say" />
        </RadioGroup>
      </FormControl>

      <TextField 
        label="Phone Number" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        inputProps={{ maxLength: 10 }} 
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Course Type</InputLabel>
        <Select>
          <MenuItem value="scheduler">Scheduler</MenuItem>
          <MenuItem value="studyAllocator">Study Allocator</MenuItem>
          <MenuItem value="cvBuilder">CV Builder</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">How did you hear about us?</FormLabel>
        <RadioGroup value={heardAboutUs} onChange={handleHeardAboutUsChange}>
          <FormControlLabel value="magazineAd" control={<Radio />} label="Magazine Ad" />
          <FormControlLabel value="eNewsletter" control={<Radio />} label="E-News letter" />
          <FormControlLabel value="google" control={<Radio />} label="Google" />
          <FormControlLabel value="socialMedia" control={<Radio />} label="Social Media" />
          <FormControlLabel value="friendReferral" control={<Radio />} label="Friend Referral" />
          <FormControlLabel value="universityReferral" control={<Radio />} label="University Referral" />
          <FormControlLabel 
            value="other" 
            control={<Radio />} 
            label={
              <TextField 
                placeholder="Other" 
                variant="standard" 
                margin="normal" 
                onClick={(e) => e.stopPropagation()} 
                onChange={(e) => setOtherSource(e.target.value)} 
              />
            } 
          />
        </RadioGroup>
      </FormControl>

      <input type="file" accept="image/*" style={{ margin: '20px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="contained" color="primary">Save</Button>
        <Button variant="outlined" color="secondary">Fill Later</Button>
      </div>
    </form>
  );
};

export default UserForm;
