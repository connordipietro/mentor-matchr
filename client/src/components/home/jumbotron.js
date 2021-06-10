/* eslint-disable no-dupe-keys */
import { Container, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { config } from '../../config/constants';

const StyledButton = withStyles({
  root: {
    background: 'rgba(255, 255, 255, 0.17)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: '10vh',
    width: '40vw',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'none',
  },
})(Button);

const StyledContainer = withStyles({
  root: {
    background: 'black',
    color: 'white',
    height: '30.5vh',
    width: '100%',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})(Container);

export default function Jumbotron() {
  return (
    <>
      <StyledContainer maxWidth={false}>
        <Typography variant="h2">Mentor Matchr </Typography>
      </StyledContainer>
      <StyledContainer maxWidth={false}>
        <Typography variant="h4">
          Connecting developers accross experience levels.
        </Typography>
      </StyledContainer>
      <StyledContainer maxWidth={false}>
        <StyledButton
          onClick={() => (window.location.href = config.url.API_AUTH_GOOGLE)}
        >
          <Typography variant="h5">Login or Signup </Typography>
        </StyledButton>
      </StyledContainer>
    </>
  );
}
