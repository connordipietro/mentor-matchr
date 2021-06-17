import { PropTypes } from 'prop-types';
import TextEditor from '../components/pair-programming/textEditor';
import useIsAccountSetup from '../utilities/accountSetupHook';
import useAuthCheck from '../utilities/authCheckHook';

export const PairProgramming = (props) => {
  const { history } = props;
  const { state } = history.location;
  const isAuth = useAuthCheck();
  const isAccountSetup = useIsAccountSetup();

  return (
    <>{!isAuth || !isAccountSetup ? null : <TextEditor userData={state} />}</>
  );
};

PairProgramming.propTypes = {
  history: PropTypes.any,
};
