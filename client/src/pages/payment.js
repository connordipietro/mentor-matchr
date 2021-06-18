import { Container, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginStatus } from '../utilities/api';
import { LoadingSpinner, StripeForm } from '../components';

export const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getLoginStatus()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        history.push('/login');
        setLoading(false);
      });
  });

  return !loading ? (
    <Container maxWidth="sm">
      <Typography variant="h6">Add a new payment method</Typography>
      <br />
      <br />
      <StripeForm />
    </Container>
  ) : (
    <LoadingSpinner loading={loading} />
  );
};

export default PaymentPage;
