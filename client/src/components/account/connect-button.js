import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '@material-ui/core';
import { postConnections, getConnections } from '../../utilities/api';

export default function ConnectButton({ requestedEmail }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    const data = { email: requestedEmail };
    getConnections(data)
      .then((res) => {
        // If no connections exist in db, connect button rendered
        if (!res.data.connections) {
          setStatus({ status: 'Connect' });
          setLoading(false);
          return;
        }

        // If connection exist in db, and it was initiatied from another user and not yet accepted render accept
        if (
          res.data.connections.sender === requestedEmail &&
          res.data.connections.status === 'initiated'
        ) {
          setStatus({ ...res.data.connection, status: 'Accept' });
          setLoading(false);
          return;
        }

        // If connection exists in db and current user initiated the request, render status
        setStatus(res.data.connections);
        setLoading(false);
        setDisabledBtn(true);
      })
      .catch((err) => {
        setLoading(false);
        setStatus(false);
      });
  }, [loading, requestedEmail]);

  const handleClick = () => {
    // If connection status hasn't been initiated, send post to backend and connection is created
    if (status.status === 'Connect') {
      setDisabledBtn(true);
      setLoading(true);
      // Send request to server
      const data = { email: requestedEmail };
      postConnections(data);
      return;
    }
    // If connection status is accept, on click user is accepting the connection. Send update to server
    if (status.status === 'Accept') {
      setDisabledBtn(true);
      setLoading(true);
      const data = { email: requestedEmail };
      postConnections(data);
    }
  };

  return (
    <>
      {loading ? null : (
        <Button
          onClick={() => handleClick()}
          color="primary"
          disabled={disabledBtn}
        >
          {status.status}
        </Button>
      )}
    </>
  );
}

ConnectButton.propTypes = {
  requestedEmail: PropTypes.string,
};
