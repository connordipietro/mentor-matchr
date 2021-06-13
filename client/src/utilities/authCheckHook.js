import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getLoginStatus } from './api';

export default function useAuthCheck() {
  const [isAuthed, setIsAuth] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    getLoginStatus()
      .then((res) => {
        if (isMounted) setIsAuth(true);
      })
      .catch((err) => {
        if (isMounted) history.push('/home');
      });
    return () => (isMounted = false);
  }, [history]);

  return isAuthed;
}
