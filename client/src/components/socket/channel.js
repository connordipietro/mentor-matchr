import { PropTypes } from 'prop-types';

export default function Channel({ name, participants }) {
  return (
    <div className="channel-item">
      <div>{name}</div>‍<span>{participants}</span>
    </div>
  );
}

Channel.propTypes = {
  name: PropTypes.string,
  participants: PropTypes.number,
};
