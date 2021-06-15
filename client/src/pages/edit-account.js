import CreateAccountForm from '../components/account-form/create-account-form';
import useIsAccountSetup from '../utilities/accountSetupHook';
import useAuthCheck from '../utilities/authCheckHook';

export const EditAccountPage = () => {
  const isAuth = useAuthCheck();
  const isAccountSetup = useIsAccountSetup();

  return (
    <>
      {!isAuth || !isAccountSetup ? null : (
        <CreateAccountForm edit requestedEmail="user" />
      )}
    </>
  );
};

export default EditAccountPage;
