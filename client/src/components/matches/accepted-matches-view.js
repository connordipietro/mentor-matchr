import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getAcceptedConnections } from '../../utilities/api';
import UserProfileView from '../account/profile-card';

export default function MatchesView() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAcceptedConnections()
      .then((res) => {
        if (res.data.connections.initiated) console.log('yes');

        const acceptedMatches = [];
        if (!_.isEmpty(res.data.connections.initiated)) {
          res.data.connections.initiated.map((match) =>
            acceptedMatches.push(match)
          );
        }
        if (!_.isEmpty(res.data.connections.accepted)) {
          res.data.connections.accepted.map((match) =>
            acceptedMatches.push(match)
          );
        }
        setMatches(acceptedMatches);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderMatches = () => {
    const allMatches = matches.map((match) => (
      <Grid item xs={6} key={match}>
        <UserProfileView requestedEmail={match} type="accepted" />
      </Grid>
    ));
    return <Grid container>{allMatches}</Grid>;
  };

  return <>{loading ? null : renderMatches()}</>;
}
