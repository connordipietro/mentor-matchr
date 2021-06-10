/* eslint-disable no-dupe-keys */
import { Container, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: '10vh',
    width: '40vw',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const StyledContainer = withStyles({
  root: {
    background: 'white',
    color: 'black',
    height: '30vh',
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
        <Typography variant="h1">Mentor Matchr </Typography>
      </StyledContainer>
      <StyledContainer maxWidth={false}>
        <Typography variant="h3">
          Connecting developers accross experience levels.
        </Typography>
      </StyledContainer>
      <StyledContainer maxWidth={false}>
        <StyledButton>
          <Typography variant="h4">Learn more! </Typography>
        </StyledButton>
      </StyledContainer>
    </>
  );
}
