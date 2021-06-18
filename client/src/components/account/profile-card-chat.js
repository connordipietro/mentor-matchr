import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardContent,
  Collapse,
  CardActions,
  IconButton,
  Button,
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
  buttonLeft: {
    marginLeft: '0.5em',
    backgroundColor: 'steelblue',
    color: 'white',
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
  const history = useHistory();

  const handleCollabClick = () => {
    history.push({
      pathname: `/pair-programming/${matchId}`,
      state: { senderEmail, recipientEmail, matchId },
    });
  };
  const handleTipClick = () => {
    history.push({
      pathname: `/payment/`,
      state: { senderEmail, recipientEmail, matchId },
    });
  };

  return (
    <>
      <CardActions disableSpacing>
        <Button
          size="small"
          variant="contained"
          className={classes.buttonLeft}
          onClick={(e) => handleCollabClick(e)}
        >
          Pair Program
        </Button>
        <Button
          size="small"
          variant="contained"
          className={classes.buttonLeft}
          onClick={(e) => handleTipClick(e)}
        >
          Tip with Stripe
        </Button>
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
