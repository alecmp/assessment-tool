import React from 'react';
import { FormControl, FormControlLabel, Slider as MuiSlider} from '@material-ui/core';

export default function Slider(props) {

const { name, label, value, step,defaultValue, onChange, items } = props;

  return (
    
    <FormControl>
    <FormControlLabel
        control={<MuiSlider
            label={label}
            name={name}
            defaultValue = {defaultValue}
            step = {step}
            color="primary"
            checked={value}
            onChange={onChange}
        />}
        
    />
</FormControl>
           
  );
};
