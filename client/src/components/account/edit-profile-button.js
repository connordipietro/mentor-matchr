import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function EditProfileButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
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
        <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
      </Menu>
    </>
  );
}
