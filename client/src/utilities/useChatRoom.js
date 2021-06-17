import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { config } from '../config/constants';
import { getChatLog } from './api';

// Same as server side socket var
const NEW_MESSAGE_EVENT = 'new-message-event';
const SOCKET_SERVER_URL = config.url.PORT;

const useChatRoom = (matchId, senderEmail) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  useEffect(() => {
    // create a new client with our server url
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Get chatLog from DB
    getChatLog({ matchId }).then((res) => {
      const { chatLog } = res.data;

      const chatLogWithIsOwner = chatLog.map((msg) => ({
        ...msg,
        isOwner: msg.senderEmail === senderEmail,
      }));

      setMessages(chatLogWithIsOwner);
    });
    // Send the matchId to server so a unique room can be created for matched users
    socketRef.current.emit('matchId', matchId);

    // listen for incoming message
    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        isOwner: message.senderEmail === senderEmail,
      };
      // send the new message to the others in the same room.
      setMessages((prevState) => [...prevState, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [matchId, senderEmail]);

  // send the messagee along with a sender id. The sender id would allow us to style the UI just like a message app like iOS.
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      body: messageBody.text,
      senderId: socketRef.current.id,
      emailFrom: messageBody.emailFrom,
      recipientEmail: messageBody.recipientEmail,
      senderEmail: messageBody.senderEmail,
      matchId: messageBody.id,
      sentDate: Date.now(),
    });
  };

  return { messages, sendMessage };
};

export default useChatRoom;
