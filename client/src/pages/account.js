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
          <h1>User Profile </h1>
          <UserProfileView requestedEmail="user" />
        </>
      )}
      <div />
    </>
  );
};

export default AccountPage;
