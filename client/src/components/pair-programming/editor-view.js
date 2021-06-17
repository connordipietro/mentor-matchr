/* import React, { useRef, useState, useEffect } from 'react';
import { Paper, TextField, Button, makeStyles } from '@material-ui/core';
import { PropTypes } from 'prop-types';

import clsx from 'clsx';
import useChatRoom from '../../utilities/useChatRoom';
import useTextEditor from '../../utilities/useTextEditor';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
  },
  paper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  action: {
    display: 'flex',
    width: '96%',
    alignItems: 'center',
    margin: '1em',
    position: 'absolute',
    bottom: 0,
  },
  sendButton: {
    width: '10em',
    height: '50%',
    margin: '0 2em',
  },
  messageInput: {
    width: '100%',
  },
  messageContainer: {
    overflowY: 'auto',
    height: '80%',
  },
  divider: {
    margin: '0.1em',
  },
  message: {
    listStyle: 'none',
  },
  guest: {
    margin: '1em',
    backgroundColor: 'grey',
    padding: '0.5em 1.5em',
    borderRadius: '20px',
    color: '#FFF',
    wordBreak: 'break-word',
    maxWidth: '65%',
    width: 'fit-content',
    marginRight: 'auto',
  },
  owner: {
    margin: '2em',
    backgroundColor: '#0091EA',
    padding: '0.5em 1.5em',
    borderRadius: '20px',
    color: '#FFF',
    wordBreak: 'break-word',
    maxWidth: '65%',
    width: 'fit-content',
    marginLeft: 'auto',
  },
  ol: {
    paddingInlineEnd: '40px',
  },
});

const Room = ({ recipientEmail, senderEmail, matchId }) => {
  const { editorText, sendText } = useTextEditor(matchId, senderEmail);
  const [newText, setNewText] = useState('');
  const classes = useStyles();
  const messageRef = useRef();

  const handleNewMessageChange = (event) => {
    setNewText(event.target.value);
  };

  const handleSendText = () => {
    if (newText !== '') {
      const msg = {
        text: newText,
        recipientEmail,
        senderEmail,
        id: matchId,
      };
      sendText(msg);
    }
  };

  return (
    <div className={classes.container}>
      <Paper variant="outlined" className={classes.paper}>
        <div className={classes.messageContainer}>
          <ol className={classes.ol}>
            {messages.map((message, i) => (
              <li
                key={i}
                className={clsx(
                  classes.message,
                  message.isOwner ? classes.owner : classes.guest
                )}
              >
                <span>{message.body}</span>
              </li>
            ))}
          </ol>
          <div ref={messageRef} />
        </div>
        <div className={classes.action}>
          <TextField
            className={classes.messageInput}
            id="message"
            label="Message"
            placeholder="enter message here"
            variant="outlined"
            value={newMessage}
            onChange={handleNewMessageChange}
            onKeyUp={handleKeyUp}
          />
          <Button
            disabled={!newMessage}
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            className={classes.sendButton}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Room;

Room.propTypes = {
  recipientEmail: PropTypes.string,
  senderEmail: PropTypes.string,
  matchId: PropTypes.string,
};
 */
