/* import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { config } from '../config/constants';
import { getChatLog } from './api';

// Same as server side socket var

const useBadges = (matchId, senderEmail) => {
  const [globalBadge, setGlobalBadge] = useState([]);
  const [chatBadge, setChatBadge] = useState([]);

  useEffect(() => {
    getChatLog({ matchId }).then((res) => {
      const { chatLog, time } = res.data;
      console.log(chatLog);
      console.log(time);
      // Could move all of this into a new backend route...
    });
  }, []);

  // Can also send a function in the return to access anywhere

  return { globalBadge, setGlobalBadge };
};

export default useBadges;
 */
