import { PropTypes } from 'prop-types';
import Channel from './channel';
import './chat.css';

export default function ChannelList({ channels }) {
  let list = `There is no channels to show`;
  if (channels) {
    list = channels.map((c) => (
      <Channel
        key={c.id}
        id={c.id}
        name={c.name}
        participants={c.participants}
      />
    ));
  }

  return <div className="channel-list">{list}</div>;
}

ChannelList.propTypes = {
  channels: PropTypes.array,
};
