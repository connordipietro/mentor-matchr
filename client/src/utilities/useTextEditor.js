import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { challengeObj } from '../components/pair-programming/js-challenges';
import { config } from '../config/constants';
// import { getChatLog } from './api';

// Same as server side socket var
const NEW_TEXT_EDITOR_EVENT = 'new-text-editor-event';
const NEW_TEXT_EDITOR_THEME = 'new-text-editor-theme';
const NEW_TEXT_EDITOR_LANGUAGE = 'new-text-editor-language';
const NEW_TEXT_EDITOR_CHALLENGE = 'new-text-editor-challenge';
const SOCKET_SERVER_URL = config.url.PORT;

const useTextEditor = (matchId, senderEmail) => {
  const [editorText, setEditorText] = useState({
    body: challengeObj.content[1],
  });
  const [editorTheme, setEditorTheme] = useState('monokai');
  const [editorLanguage, setEditorLanguage] = useState('javascript');
  const [editorChallenge, setEditorChallenge] = useState('BitCounting');
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

    // Broadcast challenge change to room
    socketRef.current.on(NEW_TEXT_EDITOR_CHALLENGE, (challengeData) => {
      const challengeInfo = challengeObj.names.indexOf(challengeData.challenge);
      const data = challengeObj.content[challengeInfo];
      const challengeText = {
        body: data,
      };
      setEditorText(challengeText);
      setEditorChallenge(challengeData.challenge);
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

  const sendChallenge = (challenge) => {
    socketRef.current.emit(NEW_TEXT_EDITOR_CHALLENGE, { challenge });
  };

  return {
    editorText,
    sendText,
    editorTheme,
    sendTheme,
    editorLanguage,
    sendLanguage,
    editorChallenge,
    sendChallenge,
  };
};

export default useTextEditor;
