import { useState } from 'react';
import ChannelList from './channel-list';
import './chat.css';

function Chat() {
  const [channels, setChannels] = useState([
    { id: 1, name: 'first', participants: 10 },
  ]);
  return (
    <>
      <ChannelList channels={channels} />
    </>
  );
}

export default Chat;
