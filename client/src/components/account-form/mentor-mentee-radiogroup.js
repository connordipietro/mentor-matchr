import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import '../../pages/pages.css';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useStyles } from './create-account-form-styles';

export default function MentoMenteeRadioGroup({ setMentorMentee }) {
  const [userIsMentorOrMentee, setUserIsMentorOrMentee] = useState({
    mentorMentee: 'mentor',
  });

  const handleMentorMenteeChange = (evt) => {
    setUserIsMentorOrMentee({ [evt.target.name]: evt.target.value });
  };

  const classes = useStyles();

  useEffect(() => {
    setMentorMentee(userIsMentorOrMentee);
  }, [setMentorMentee, userIsMentorOrMentee]);

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <RadioGroup
        name="mentorMentee"
        value={userIsMentorOrMentee.mentorMentee}
        onChange={handleMentorMenteeChange}
      >
        <FormControlLabel value="mentor" control={<Radio />} label="mentor" />
        <FormControlLabel value="mentee" control={<Radio />} label="mentee" />
      </RadioGroup>
    </FormControl>
  );
}

MentoMenteeRadioGroup.propTypes = {
  setMentorMentee: PropTypes.func,
};
