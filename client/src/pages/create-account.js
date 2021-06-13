import CreateAccountForm from '../components/account-form/create-account-form';
import useIsAccountSetup from '../utilities/accountSetupHook';
import useAuthCheck from '../utilities/authCheckHook';

export const CreateAccountPage = () => {
  const isAuth = useAuthCheck();
  const isAccountSetup = useIsAccountSetup();

  return <>{isAuth && isAccountSetup ? <CreateAccountForm /> : null}</>;
};

export default CreateAccountPage;
