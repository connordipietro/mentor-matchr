import { Container } from '@material-ui/core';
import UserProfileView from '../components/account/profile-card';
import useIsAccountSetup from '../utilities/accountSetupHook';
import useAuthCheck from '../utilities/authCheckHook';

export const AccountPage = () => {
  const isAccountSetup = useIsAccountSetup();
  const isAuth = useAuthCheck();

  return (
    <>
      {!isAccountSetup || !isAuth ? null : (
        <>
          <Container maxWidth="sm" style={{ marginTop: '5vh' }}>
            <UserProfileView requestedEmail="user" />
          </Container>
        </>
      )}
      <div />
    </>
  );
};

export default AccountPage;
