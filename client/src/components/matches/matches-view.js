import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getMatches } from '../../utilities/api';
import UserProfileView from '../account/profile-card';
import { LoadingSpinner } from '../style/loading-spinner';

export default function MatchesView() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches()
      .then((res) => {
        setLoading(false);
        // setMatches(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return <>{loading ? <LoadingSpinner loading={loading} /> : <h1>Test</h1>}</>;
}
