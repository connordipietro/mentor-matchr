import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import moment from 'moment';
import { postBanner, checkIfBanner } from '../../utilities/api';

export const CreateBanner = () => {
  const [hasBennerBeenChecked, setHasBannerBeenChecked] = useState(false);
  const [bannerData, setBannerData] = useState();
  const [time, setTime] = useState();
  const [error, setError] = useState();

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
    console.log(evt.target);

    const bannerMsg = evt.target[0].value;

    // Return if text field empty
    if (evt.target[0].value === '') {
      setError('Please enter a banner message to continue');
      return;
    }

    await postBanner({ bannerMsg, expireTime: time }).then(function (result) {
      if (result) {
        setError(null);
        setHasBannerBeenChecked(false);
      }
    });
  };

  return (
    <div>
      {error ? <div>{error}</div> : null}
      {!bannerData ? (
        <div>No Banner currently active</div>
      ) : (
        <div>
          You have an active banner. The message is:
          <br />
          <b>{bannerData.bannerMsg}</b>
          <br />
          The expiration date is
          <b>{moment(bannerData.expireTime).format(' MMMM DD, HH:mm')}</b>
        </div>
      )}
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" required />
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          defaultValue={moment().format('YYY-MM-DDTHH:mm:ss')}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit"> Create new banner </button>
      </form>
    </div>
  );
};
