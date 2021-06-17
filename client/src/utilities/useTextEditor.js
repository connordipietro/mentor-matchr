import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { config } from '../config/constants';
// import { getChatLog } from './api';

// Same as server side socket var
const NEW_TEXT_EDITOR_EVENT = 'new-text-editor-event';
const NEW_TEXT_EDITOR_THEME = 'new-text-editor-theme';
const NEW_TEXT_EDITOR_LANGUAGE = 'new-text-editor-language';
const SOCKET_SERVER_URL = config.url.PORT;

const useTextEditor = (matchId, senderEmail) => {
  const [editorText, setEditorText] = useState([]);
  const [editorTheme, setEditorTheme] = useState('monokai');
  const [editorLanguage, setEditorLanguage] = useState('javascript');
  const socketRef = useRef();
  useEffect(() => {
    // create a new client with our server url
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

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
      // send the new text body to the others in the same room.
      setEditorText(incomingText);
    });

    // Broadcast theme change to room
    socketRef.current.on(NEW_TEXT_EDITOR_THEME, (themeData) => {
      // send the new message to the others in the same room.
      setEditorTheme(themeData.theme);
    });

    socketRef.current.on(NEW_TEXT_EDITOR_LANGUAGE, (languageData) => {
      // send the new message to the others in the same room.
      setEditorLanguage(languageData.language);
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

  const sendTheme = (theme) => {
    socketRef.current.emit(NEW_TEXT_EDITOR_THEME, { theme });
  };

  const sendLanguage = (language) => {
    socketRef.current.emit(NEW_TEXT_EDITOR_LANGUAGE, { language });
  };

  return {
    editorText,
    sendText,
    editorTheme,
    sendTheme,
    editorLanguage,
    sendLanguage,
  };
};

export default useTextEditor;
