import socketClient from 'socket.io-client';
import Chat from './chat';
import { config } from '../../config/constants';

function ChatContainer() {
  const socket = socketClient(config.url.PORT);
  socket.on('connection', () => console.log(`I'm connected with the back-end`));

  return (
    <div className="chat-app">
      <Chat />
    </div>
  );
}

export default ChatContainer;
