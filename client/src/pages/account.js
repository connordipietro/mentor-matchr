import useIsAccountSetup from '../utilities/accountSetupHook';
import useAuthCheck from '../utilities/authCheckHook';

export const AccountPage = () => {
  const isAccountSetup = useIsAccountSetup();
  const isAuth = useAuthCheck();

  return (
    <>
      {!isAccountSetup || !isAuth ? null : <h1>Account content</h1>}
      <div />
    </>
  );
};

export default AccountPage;
