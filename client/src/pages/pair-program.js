import { useParams } from 'react-router';
import { PropTypes } from 'prop-types';
import TextEditor from '../components/pair-programming/textEditor';

export const PairProgramming = (props) => {
  const { id } = useParams();
  const test = useParams();
  const { history } = props;
  const { state } = history.location;

  console.log(state);

  console.log(id);
  return (
    <>
      <TextEditor />
    </>
  );
};

PairProgramming.propTypes = {
  history: PropTypes.any,
};
