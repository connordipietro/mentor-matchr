import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { config } from '../config/constants';
// import { getChatLog } from './api';

// Same as server side socket var
const NEW_TEXT_EDITOR_EVENT = 'new-text-editor-event';
const SOCKET_SERVER_URL = config.url.PORT;

const useTextEditor = (matchId, senderEmail) => {
  const [editorText, setEditorText] = useState([]);
  const socketRef = useRef();
  useEffect(() => {
    // create a new client with our server url
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    /* // Get chatLog from DB
    getChatLog({ matchId }).then((res) => {
      const { chatLog } = res.data;

      const chatLogWithIsOwner = chatLog.map((msg) => ({
        ...msg,
        isOwner: msg.senderEmail === senderEmail,
      }));

      setMessages(chatLogWithIsOwner);
    }); */

    // Send the matchId to server so a unique room can be created for matched users
    const socketInfo = {
      matchId,
      type: 'workSpace',
    };

    socketRef.current.emit('matchId', socketInfo);

    socketRef.current.on(NEW_TEXT_EDITOR_EVENT, (text) => {
      const incomingText = {
        ...text,
        isOwner: text.senderEmail === senderEmail,
      };
      // send the new message to the others in the same room.
      setEditorText(incomingText);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [matchId, senderEmail]);

  // send the text along with a sender id.
  const sendText = (text) => {
    socketRef.current.emit(NEW_TEXT_EDITOR_EVENT, {
      body: text,
      senderId: socketRef.current.id,
      recipientEmail: text.recipientEmail,
      senderEmail: text.senderEmail,
      matchId: text.id,
      sentDate: Date.now(),
    });
  };

  return { editorText, sendText };
};

export default useTextEditor;
