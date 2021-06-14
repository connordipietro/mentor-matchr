import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core/';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getProfileInfo } from '../../utilities/api';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '50vw',
    margin: 10,
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
}));

export default function UserProfileView({ requestedEmail }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [profileInfo, setProfileInfo] = React.useState([]);

  useEffect(() => {
    const data = { email: requestedEmail };
    getProfileInfo(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [requestedEmail]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Users Name Here"
        subheader="Mentor / Mentee"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Bio will go here
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Availibility
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Times
        </Typography>
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
  );
}

UserProfileView.propTypes = {
  requestedEmail: PropTypes.string,
};
