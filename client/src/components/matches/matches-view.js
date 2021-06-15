import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getMatches } from '../../utilities/api';
import UserProfileView from '../account/profile-card';

export default function MatchesView() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches()
      .then((res) => {
        setMatches(res.data.matches);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderMatches = () => {
    const allMatches = matches.map((match) => (
      <Grid item xs={6} key={match.email}>
        <UserProfileView requestedEmail={match.email} />
      </Grid>
    ));
    return <Grid container>{allMatches}</Grid>;
  };

  return <>{loading ? null : renderMatches()}</>;
}
