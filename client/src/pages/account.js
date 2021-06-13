import useIsAccountSetup from '../utilities/accountSetupHook';

export const AccountPage = () => {
  const isAccountSetup = useIsAccountSetup();

  return <>{!isAccountSetup ? <h1>Redirecting</h1> : null}</>;
};

export default AccountPage;
