import MatchesView from '../components/matches/matches-view';
import useIsAccountSetup from '../utilities/accountSetupHook';
import useAuthCheck from '../utilities/authCheckHook';

export const MatchesPage = () => {
  const isAccountSetup = useIsAccountSetup();
  const isAuth = useAuthCheck();

  return (
    <>
      {!isAccountSetup || !isAuth ? (
        <h1>Redirecting</h1>
      ) : (
        <>
          <h1>Matches Page</h1>
          <MatchesView />
        </>
      )}
      <div />
    </>
  );
};

export default MatchesPage;
