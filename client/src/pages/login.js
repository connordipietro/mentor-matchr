import { config } from '../config/constants';

export const LoginPage = () => {
  console.log(config);
  return (
    <>
      <div>Login Page</div>
      <button
        type="button"
        onClick={() => (window.location.href = config.url.API_AUTH_GOOGLE)}
      >
        Login with Google
      </button>
    </>
  );
};
