import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginStatus } from '../utilities/api';
import { StripeForm } from '../components';

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
    <div>
      <h3>Payment Page</h3>
      <StripeForm />
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default PaymentPage;
