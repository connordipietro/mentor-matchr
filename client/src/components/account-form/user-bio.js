import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import '../../pages/pages.css';
import { FormControl, FormGroup, TextField } from '@material-ui/core';
import { useStyles } from './create-account-form-styles';

export default function UserBio({ setBio }) {
  const [userBio, setUserBio] = useState('');

  const handleBioChange = (evt) => {
    setUserBio(evt.target.value);
  };

  const classes = useStyles();

  useEffect(() => {
    setBio(userBio);
  }, [setBio, userBio]);

  return (
    <>
      <FormControl
        required
        component="fieldset"
        className={classes.formControl}
      >
        <FormGroup>
          <TextField
            id="outlined-multiline-static"
            label="User Bio"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            onChange={handleBioChange}
          />
        </FormGroup>
      </FormControl>
    </>
  );
}

UserBio.propTypes = {
  setBio: PropTypes.func,
};
