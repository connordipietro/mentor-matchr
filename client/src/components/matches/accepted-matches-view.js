import { Container, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getAcceptedConnections } from '../../utilities/api';
import UserProfileView from '../account/profile-card';

export default function AcceptedMatchesView() {
  const [matches, setMatches] = useState([]);
  const [matchId, setMatchId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAcceptedConnections()
      .then((res) => {
        const acceptedMatches = [];
        const acceptedMatchIds = [];
        if (!_.isEmpty(res.data.connections.initiated)) {
          res.data.connections.initiated.map((match) =>
            acceptedMatches.push(match)
          );
          res.data.connections.acceptedIds.map((match) =>
            acceptedMatchIds.push(match)
          );
        }
        if (!_.isEmpty(res.data.connections.accepted)) {
          res.data.connections.accepted.map((match) =>
            acceptedMatches.push(match)
          );
          res.data.connections.initiatedIds.map((match) =>
            acceptedMatchIds.push(match)
          );
        }
        setMatches(acceptedMatches);
        setMatchId(acceptedMatchIds);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? null : (
        <>
          {matches.map((match, i) => (
            <div key={matchId[i]}>
              <UserProfileView
                requestedEmail={match}
                type="accepted"
                matchId={matchId[i]}
              />
              <br />
            </div>
          ))}
        </>
      )}
    </>
  );
}
