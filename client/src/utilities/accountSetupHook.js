import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getLoginStatus } from './api';

export default function useIsAccountSetup() {
  const [isSetUp, setIsSetUp] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    getLoginStatus()
      .then((res) => {
        if (!res.data.accountSetUp) history.push('/create-account');
        if (isMounted && res.data.accountSetUp) setIsSetUp(true);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => (isMounted = false);
  }, [history]);

  return isSetUp;
}
