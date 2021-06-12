import '../../pages/pages.css';
import {
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useStyles } from './create-account-form-styles';
import AvatarUpload from './avatar-upload';
import ChipsHandler from './interest-chips/chip-handler';
import DayTimeCheckBoxes from './day-time-checkboxes';
import MentoMenteeRadioGroup from './mentor-mentee-radiogroup';

export default function CreateAccountForm() {
  const [mentorMentee, setMentorMentee] = useState({});
  const [daysState, setDaysState] = useState({});
  const [timeState, setTimeState] = useState({});
  const [avatar, setAvatar] = useState([]);
  const [chips, setChips] = useState([]);

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

    const data = {
      mentorMentee,
      timeState,
      daysState,
      userAvatar: avatar,
      userInterests: chips,
    };

    console.log(data);

    // TODO Post to BE and finish user account setup
  };

  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="sm">
        <Paper className={classes.root}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5">Let's set up your account</Typography>
            <Typography variant="h6">Which are you?</Typography>
            <MentoMenteeRadioGroup setMentorMentee={setMentorMentee} />
            <Divider className={classes.divider} />
            <DayTimeCheckBoxes
              setDaysState={setDaysState}
              setTimeState={setTimeState}
            />
            <Divider className={classes.divider} />
            <Typography variant="h6">Select your interests</Typography>
            <ChipsHandler chips={chips} setChips={setChips} />
            <Divider className={classes.divider} />
            <Typography variant="h6">Upload a profile picture</Typography>
            <AvatarUpload setAvatar={setAvatar} />
            <Divider className={classes.divider} />
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
