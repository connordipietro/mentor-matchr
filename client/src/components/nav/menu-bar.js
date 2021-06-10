import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormGroup,
  MenuItem,
  Menu,
  FormControlLabel,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import TemporaryDrawer from './side-drawer';
import { getLoginStatus, logout } from '../../utilities/api';
import { config } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuBar() {
  const history = useHistory();
  const classes = useStyles();

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);

  const open = Boolean(anchorEl);

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <TemporaryDrawer
            auth={auth}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />
          <Typography variant="h6" className={classes.title} />
          {!loading && auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
          {!loading ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={auth}
                    onChange={handleChange}
                    aria-label="login switch"
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
