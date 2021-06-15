import { Container } from '@material-ui/core';
import MatchesView from '../components/matches/matches-view';
import useIsAccountSetup from '../utilities/accountSetupHook';
import useAuthCheck from '../utilities/authCheckHook';

export const MatchesPage = () => {
  const isAccountSetup = useIsAccountSetup();
  const isAuth = useAuthCheck();

  return (
    <>
      {!isAccountSetup || !isAuth ? null : (
        <>
          <Container maxWidth="lg" style={{ marginTop: '5vh' }}>
            <MatchesView />
          </Container>
        </>
      )}
      <div />
    </>
  );
};

export default MatchesPage;
