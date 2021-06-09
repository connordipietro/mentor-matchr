import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { postBanner, checkIfBanner } from '../../utilities/api';

export const CreateBanner = () => {
  const [error, setError] = useState();
  const [hasBennerBeenChecked, setHasBannerBeenChecked] = useState(false);
  const [bannerData, setBannerData] = useState();
  const [time, setTime] = useState();

  useEffect(() => {
    checkIfBanner()
      .then(({ data }) => {
        console.log(data);
        setBannerData({
          bannerMsg: data.bannerMsg,
          expireTime: data.expirationDate,
        });
      })
      .catch((err) => {
        setBannerData(false);
      })
      .then(setHasBannerBeenChecked(true));
  }, [hasBennerBeenChecked]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);

    // hard coded testing values
    const bannerMsg = event.target[0].value;

    // Return if text field empty
    if (event.target[0].value === '') {
      setError('Please enter a banner message to continue');
      return;
    }

    const payload = await postBanner({ bannerMsg, expireTime: time }).then(
      function (result) {
        if (result) {
          setError(null);
          console.log(result);
          setHasBannerBeenChecked(false);
        }
      }
    );
    console.log(payload);
  };

  return (
    <div>
      {error ? <div>{error}</div> : null}
      {!bannerData ? (
        <div>No Banner currently active</div>
      ) : (
        <div>
          You have an active banner. The message is {bannerData.bannerMsg} and
          the expiration time is {bannerData.expireTime}{' '}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" required />
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
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
