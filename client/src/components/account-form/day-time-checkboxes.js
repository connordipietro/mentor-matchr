import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import '../../pages/pages.css';
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@material-ui/core';
import { useStyles } from './create-account-form-styles';

export default function DayTimeCheckBoxes({ setDaysState, setTimeState }) {
  const [userDays, setUserDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [userTime, setUserTime] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  const handleDaysChange = (evt) => {
    const prevValue = userDays[evt.target.name];
    setUserDays({ ...userDays, [evt.target.name]: !prevValue });
  };

  const handleTimeChange = (evt) => {
    const prevValue = userTime[evt.target.name];
    setUserTime({ ...userTime, [evt.target.name]: !prevValue });
  };

  const classes = useStyles();

  useEffect(() => {
    setDaysState(userDays);
    setTimeState(userTime);
  }, [setDaysState, setTimeState, userDays, userTime]);

  return (
    <div>
      <FormControl
        required
        component="fieldset"
        className={classes.formControl}
      >
        <FormGroup>
          <Typography variant="h6">Which days are you availible?</Typography>
          {[
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
          ].map((day) => (
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkBox}
                  checked={userDays.day}
                  onChange={handleDaysChange}
                  name={day}
                />
              }
              label={day}
              key={day}
            />
          ))}
        </FormGroup>
        <Divider className={classes.divider} />
      </FormControl>
      <FormControl
        required
        component="fieldset"
        className={classes.formControl}
      >
        <FormGroup>
          <Typography variant="h6">When do you perfer to meet?</Typography>
          {['morning', 'afternoon', 'evening'].map((time) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={userTime.time}
                  onChange={handleTimeChange}
                  name={time}
                />
              }
              label={time}
              key={time}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}

DayTimeCheckBoxes.propTypes = {
  setDaysState: PropTypes.func,
  setTimeState: PropTypes.func,
};
