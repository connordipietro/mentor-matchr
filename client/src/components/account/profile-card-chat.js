import { useState } from 'react';
import clsx from 'clsx';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardContent,
  Collapse,
  CardActions,
  IconButton,
} from '@material-ui/core/';
import SendIcon from '@material-ui/icons/Send';
import Room from '../chat/room';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'grey',
  },
}));

export default function ProfileCardChat({
  recipientEmail,
  senderEmail,
  matchId,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <SendIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Room
            recipientEmail={recipientEmail}
            senderEmail={senderEmail}
            matchId={matchId}
          />
        </CardContent>
      </Collapse>
    </>
  );
}

ProfileCardChat.propTypes = {
  recipientEmail: PropTypes.string,
  senderEmail: PropTypes.string,
  matchId: PropTypes.string,
};
