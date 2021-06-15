import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getMatches } from '../../utilities/api';
import UserProfileView from '../account/profile-card';
import { LoadingSpinner } from '../style/loading-spinner';

export default function MatchesView() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('using effect');
    getMatches()
      .then((res) => {
        setMatches(res.data.matches);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderMatches = () => {
    console.log(matches);
    const allMatches = matches.map((match) => (
      <UserProfileView requestedEmail={match.email} key={match.email} />
    ));
    return allMatches;
  };

  return (
    <>{loading ? <LoadingSpinner loading={loading} /> : renderMatches()}</>
  );
}
