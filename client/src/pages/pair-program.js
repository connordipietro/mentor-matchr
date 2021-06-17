import { PropTypes } from 'prop-types';
import TextEditor from '../components/pair-programming/textEditor';

export const PairProgramming = (props) => {
  const { history } = props;
  const { state } = history.location;

  return (
    <>
      <TextEditor userData={state} />
    </>
  );
};

PairProgramming.propTypes = {
  history: PropTypes.any,
};
