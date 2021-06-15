import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Chip,
} from '@material-ui/core/';
import { red } from '@material-ui/core/colors';
import defaultAvatar from '../style/defaultavatar.png';
import { getProfileInfo } from '../../utilities/api';
import { LoadingSpinner } from '../style/loading-spinner';
import EditProfileButton from './edit-profile-button';
import ConnectButton from './connect-button';

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
  rightIcon: {
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
  const [profileInfo, setProfileInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = { email: requestedEmail };
    getProfileInfo(data)
      .then((res) => {
        setProfileInfo(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [requestedEmail]);

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
            action={
              type === 'user' ? (
                <EditProfileButton />
              ) : (
                <ConnectButton requestedEmail={requestedEmail} />
              )
            }
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
        </Card>
      )}
    </>
  );
}

UserProfileView.propTypes = {
  requestedEmail: PropTypes.string,
  type: PropTypes.string,
};
