import '../../pages/pages.css';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useStyles } from './create-account-form-styles';

export default function CreateAccountForm() {
  const [mentorMentee, setMentorMentee] = useState({ mentorMentee: 'mentor' });

  const [daysState, setDaysState] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [timeState, setTimeState] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  const [error, setError] = useState({
    days: null,
    time: null,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Check for no days of the week being selected, set error and return
    const allDaysFalse = Object.keys(daysState).every((day) => !daysState[day]);

    if (allDaysFalse) {
      setError({
        ...error.time,
        days: 'Please select at least one day of the week to continue',
      });
      return;
    }

    // Check for no time being selected, set error and return
    const allTimesFalse = Object.keys(timeState).every(
      (time) => !timeState[time]
    );

    if (allTimesFalse) {
      setError({
        ...error.days,
        time: 'Please select at least one time to continute',
      });
      return;
    }

    console.log(mentorMentee, timeState, daysState);

    // TODO Post to BE and finish user account setup
    /* 
    fetch('https://pointy-gauge.glitch.me/api/form', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => console.log('Success:', JSON.stringify(response)))
      .catch((error) => console.error('Error:', error)); */
  };

  const handleMentorMenteeChange = (evt) => {
    setMentorMentee({ [evt.target.name]: evt.target.value });
    console.log(evt.target.name);
  };

  const handleDaysChange = (evt) => {
    const prevValue = daysState[evt.target.name];
    setDaysState({ ...daysState, [evt.target.name]: !prevValue });
  };

  const handleTimeChange = (evt) => {
    const prevValue = timeState[evt.target.name];
    setTimeState({ ...timeState, [evt.target.name]: !prevValue });
  };

  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="sm">
        <Paper className={classes.root}>
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" className={classes.formControl}>
              <Typography variant="h5">Let's set up your account</Typography>
              <Typography variant="h6">Which are you?</Typography>
              <RadioGroup
                aria-label="quiz"
                name="mentorMentee"
                value={mentorMentee.mentorMentee}
                onChange={handleMentorMenteeChange}
              >
                <FormControlLabel
                  value="mentor"
                  control={<Radio />}
                  label="mentor"
                />
                <FormControlLabel
                  value="mentee"
                  control={<Radio />}
                  label="mentee"
                />
              </RadioGroup>
              <Divider />
            </FormControl>
            <FormControl
              required
              component="fieldset"
              className={classes.formControl}
            >
              <FormGroup>
                <Typography variant="h6">
                  Which days are you availible?
                </Typography>
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
                        checked={daysState.day}
                        onChange={handleDaysChange}
                        name={day}
                      />
                    }
                    label={day}
                    key={day}
                  />
                ))}
              </FormGroup>
              <FormHelperText>
                {error.days ? 'Please make at least one selection' : null}
              </FormHelperText>
              <Divider />
            </FormControl>
            <FormControl
              required
              component="fieldset"
              className={classes.formControl}
            >
              <FormGroup>
                <Typography variant="h6">
                  When do you perfer to meet?
                </Typography>
                {['morning', 'afternoon', 'evening'].map((time) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={timeState.time}
                        onChange={handleTimeChange}
                        name={time}
                      />
                    }
                    label={time}
                    key={time}
                  />
                ))}
              </FormGroup>
              <FormHelperText>
                {error.time ? 'Please make at least one selection' : null}
              </FormHelperText>
            </FormControl>

            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              Get Started
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
