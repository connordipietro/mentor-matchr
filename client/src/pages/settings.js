import useIsAccountSetup from '../utilities/accountSetupHook';

export const SettingsPage = () => {
  const isAccountSetup = useIsAccountSetup();

  return (
    <>
      {!isAccountSetup ? <h1>Redirecting</h1> : null}
      <div />
    </>
  );
};

export default SettingsPage;
