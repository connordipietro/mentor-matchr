/* eslint-disable no-dupe-keys */
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { config } from '../../config/constants';

const StyledButton = withStyles({
  root: {
    background: 'rgba(255, 255, 255, 0.17)',
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: '5vh',
    minWidth: '220px',
    width: '15vw',
    padding: '0 30px',
    margin: '20px',
    boxShadow: '0 3px 5px 2px #03045e',
  },
  label: {
    textTransform: 'none',
  },
})(Button);

export default function Jumbotron() {
  return (
    <>
      {/*   <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" /> */}
      <div className="content">
        <Typography variant="h2">Mentor Matchr </Typography>
        <br />
        <Typography variant="h5">Connecting developers.</Typography>
        <br />
        <StyledButton
          onClick={() => (window.location.href = config.url.API_AUTH_GOOGLE)}
        >
          <Typography variant="h6">Login or Sign up</Typography>
        </StyledButton>
      </div>
    </>
  );
}
