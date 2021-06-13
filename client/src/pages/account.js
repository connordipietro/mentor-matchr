import useIsAccountSetup from '../utilities/accountSetupHook';
import useAuthCheck from '../utilities/authCheckHook';

export const AccountPage = () => {
  const isAccountSetup = useIsAccountSetup();
  const isAuth = useAuthCheck();

  return (
    <>
      {!isAccountSetup || !isAuth ? <h1>Redirecting</h1> : null}
      <div />
    </>
  );
};

export default AccountPage;
