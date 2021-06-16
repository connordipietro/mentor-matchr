import { useState } from 'react';
import { useHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import '../../pages/pages.css';
import {
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import { useStyles } from './create-account-form-styles';
import AvatarUpload from './avatar-upload';
import ChipsHandler from './interest-chips/chip-handler';
import DayTimeCheckBoxes from './day-time-checkboxes';
import MentoMenteeRadioGroup from './mentor-mentee-radiogroup';
import UserBio from './user-bio';
import { createAccount } from '../../utilities/api';

export default function CreateAccountForm({ edit }) {
  const [mentorMentee, setMentorMentee] = useState({});
  const [daysState, setDaysState] = useState({});
  const [timeState, setTimeState] = useState({});
  const [avatar, setAvatar] = useState([]);
  const [chips, setChips] = useState([]);
  const [bio, setBio] = useState('');

  const [error, setError] = useState(null);

  const history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Check for all false values on days checkboxes
    const allDaysFalse = Object.keys(daysState).every((day) => !daysState[day]);

    if (allDaysFalse) {
      setError('Please select at least day of availibility');
      return;
    }

    // Check for all false values on time checkboxes
    const allTimesFalse = Object.keys(timeState).every(
      (time) => !timeState[time]
    );

    if (allTimesFalse) {
      setError('Please select at least one time of availibility');
      return;
    }

    // Checks for empty chips (interests) array
    if (!chips.length) {
      setError('Please select at least one interest');
      return;
    }

    setError('');

    const data = {
      mentorMentee,
      days: daysState,
      time: timeState,
      userAvatar: avatar,
      userInterests: chips,
      userBio: bio,
    };
    // Send to server
    createAccount(data).then(() => history.push('/account'));
  };

  const classes = useStyles();

  return (
    <>
      <Container maxWidth="sm">
        <Paper className={classes.root}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5">
              {edit ? 'Edit your account' : 'Set up your account'}
            </Typography>
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
            <Typography variant="h6">Tell us about yourself:</Typography>
            <UserBio setBio={setBio} />
            <Divider className={classes.divider} />
            {error ? <Typography variant="h6">{error}</Typography> : null}
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              {edit ? 'Save Changes' : 'Get Started'}
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}

CreateAccountForm.propTypes = {
  edit: PropTypes.bool,
};
