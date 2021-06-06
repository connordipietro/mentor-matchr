import { useEffect, useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { getLoginStatus } from '../utilities/api';

export const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  console.log(history);

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
    <div>
      <h3>Payment Page</h3>
      <CardElement />
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};
