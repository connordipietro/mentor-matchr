import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import moment from 'moment';
import { postBanner, checkIfBanner } from '../../utilities/api';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
}));

export const CreateBanner = () => {
  const [hasBennerBeenChecked, setHasBannerBeenChecked] = useState(false);
  const [bannerData, setBannerData] = useState();
  const [time, setTime] = useState();
  const [error, setError] = useState();
  const [button, setButton] = useState({
    disabled: false,
    text: 'Set custom banner',
  });
  const classes = useStyles();

  useEffect(() => {
    checkIfBanner()
      .then(({ data }) => {
        setBannerData({
          bannerMsg: data.bannerMsg,
          expireTime: data.expirationDate,
        });
      })
      .catch(() => {
        setBannerData(false);
      })
      .then(setHasBannerBeenChecked(true));
  }, [hasBennerBeenChecked]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const bannerMsg = evt.target[0].value;
    console.log(bannerMsg);

    // Return if text field empty
    if (evt.target[0].value === '') {
      setError(true);
      return;
    }

    await postBanner({ bannerMsg, expireTime: time }).then(function (result) {
      if (result) {
        setError(false);
        setHasBannerBeenChecked(false);
        setButton({ disabled: true, text: 'Success!' });
      }
    });
  };

  return (
    <Container maxWidth="md">
      <Paper variant="outlined">
        {error ? <div>{error}</div> : null}
        {!bannerData ? (
          <div>No Banner currently active</div>
        ) : (
          <div>
            You have an active banner.
            <br />
            <br />
            Current Message: {` `}
            <b>{bannerData.bannerMsg}</b>
            <br />
            Expires on: {` `}
            <b>{moment(bannerData.expireTime).format(' MMMM DD, HH:mm')}</b>
          </div>
        )}
        <br />
        <br />
        <form onSubmit={handleSubmit} className={classes.root}>
          <TextField
            error={error}
            style={{ marginRight: -15 }}
            fullWidth
            id="outlined-error-helper-text"
            label="Banner Message"
            placeholder="Custom Banner Here"
            helperText="No empty banners please."
            variant="outlined"
          />
          <br />
          <br />
          <br />
          <br />
          <TextField
            id="datetime-local"
            label="Set Banner Expiration Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setTime(e.target.value)}
          />
          <br />
          <br />
          <br />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={button.disabled}
          >
            {button.text}
          </Button>
          <br />
        </form>
      </Paper>
    </Container>
  );
};
