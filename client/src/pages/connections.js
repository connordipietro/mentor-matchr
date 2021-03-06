import { Container } from '@material-ui/core';
import AcceptedMatchesView from '../components/matches/accepted-matches-view';
import useIsAccountSetup from '../utilities/accountSetupHook';
import useAuthCheck from '../utilities/authCheckHook';

export const ConnectionsPage = () => {
  const isAccountSetup = useIsAccountSetup();
  const isAuth = useAuthCheck();

  return (
    <>
      {!isAccountSetup || !isAuth ? null : (
        <>
          <Container
            maxWidth="md"
            style={{
              marginTop: '5vh',
              justifyContent: 'center',
            }}
          >
            <AcceptedMatchesView />
          </Container>
        </>
      )}
      <div />
    </>
  );
};

export default ConnectionsPage;
