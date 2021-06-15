import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Chip,
  Container,
  Grid,
  Menu,
  MenuItem,
} from '@material-ui/core/';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { AccountCircle } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import defaultAvatar from '../style/defaultavatar.png';
import { getProfileInfo } from '../../utilities/api';
import { LoadingSpinner } from '../style/loading-spinner';
import EditProfileButton from './edit-profile-button';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '50vw',
    margin: 10,
    palette: {
      primary: {
        main: '#1e88e5',
      },
      secondary: 'orange',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  chips: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
  },
}));

export default function UserProfileView({ requestedEmail, type }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [profileInfo, setProfileInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(type);

  useEffect(() => {
    const data = { email: requestedEmail };
    getProfileInfo(data)
      .then((res) => {
        setProfileInfo(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [requestedEmail]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={
                  !_.isEmpty(profileInfo.settings.avatar)
                    ? profileInfo.settings.avatar[0].data_url
                    : defaultAvatar
                }
              />
            }
            action={type === 'user' ? <EditProfileButton /> : null}
            title={profileInfo.name}
            subheader={profileInfo.settings.mentorMentee.mentorMentee}
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              {profileInfo.settings.bio}
            </Typography>
            <br />
            <Typography variant="subtitle1" color="textPrimary" component="p">
              I'm usually availible:
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {_.keys(_.pickBy(profileInfo.settings.days)).join(`, `)}
            </Typography>
            <br />
            <Typography variant="subtitle1" color="textPrimary" component="p">
              I prefer:
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {_.keys(_.pickBy(profileInfo.settings.time)).join(`, `)}
            </Typography>
            <br />
            <div className={classes.chips}>
              {profileInfo.settings.interests.map((data) => (
                <li key={data.key}>
                  <Chip
                    label={data.label}
                    variant="default"
                    size="small"
                    style={{ margin: '2px' }}
                  />
                </li>
              ))}
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}

UserProfileView.propTypes = {
  requestedEmail: PropTypes.string,
  type: PropTypes.string,
};
