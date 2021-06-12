import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import TemporaryDrawer from './side-drawer';
import { getLoginStatus, logout } from '../../utilities/api';
import { config } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  custom: {
    flexGrow: 1,
    color: 'white',
    background: 'grey',
  },
  customSwitch: {
    color: 'blue',
  },
}));

export default function MenuBar() {
  const history = useHistory();
  const classes = useStyles();

  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setAuth(e.target.checked);
    if (auth) {
      // If user is authed when toggle is checked, log them out and return to home page, return
      logout();
      setLoading(false);
      history.push('/home');
      return;
    }
    // Else, redirect them to google login page
    window.location.href = config.url.API_AUTH_GOOGLE;
  };

  // Verify login status
  useEffect(() => {
    getLoginStatus()
      .then(() => {
        setLoading(false);
        setAuth(true);
      })
      .catch((err) => {
        setLoading(false);
        setAuth(false);
      });
  }, [loading]);

  return (
    <div className={classes.custom}>
      <AppBar position="static">
        <Toolbar className={classes.custom}>
          <TemporaryDrawer
            auth={auth}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />
          <Typography variant="h6" className={classes.title} />
          {!loading ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={auth}
                    onChange={handleChange}
                    aria-label="login switch"
                    className={classes.customSwitch}
                  />
                }
                label={auth ? 'Logout' : 'Login // Signup'}
              />
            </FormGroup>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
