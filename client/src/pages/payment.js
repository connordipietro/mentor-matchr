import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginStatus } from '../utilities/api';
import { LoadingSpinner, StripeForm } from '../components';

export const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getLoginStatus()
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        history.push('/login');
        setLoading(false);
      });
  });

  return !loading ? (
    <Container maxWidth="sm">
      <h3>Payment Page</h3>
      <StripeForm />
    </Container>
  ) : (
    <LoadingSpinner loading={loading} />
  );
};

export default PaymentPage;
