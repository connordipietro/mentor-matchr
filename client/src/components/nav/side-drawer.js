import { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  makeStyles,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
} from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({ auth }) {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {auth ? (
        <List>
          {[
            { text: 'Home', icon: <HomeIcon /> },
            { text: 'Account', icon: <AccountCircle /> },
            { text: 'Matches', icon: <DoneAllIcon /> },
            { text: 'Connections', icon: <SupervisedUserCircleIcon /> },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(`/${item.text}`)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      ) : null}

      <Divider />
      <List>
        {[
          { text: 'About', icon: <InfoIcon /> },
          { text: 'Contact', icon: <MailOutlineIcon /> },
          { text: 'Donate', icon: <MonetizationOnIcon /> },
        ].map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div key="left">
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer('left', true)}
      >
        <Badge badgeContent={4} color="secondary">
          <MenuIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}

TemporaryDrawer.propTypes = {
  auth: PropTypes.bool,
};
