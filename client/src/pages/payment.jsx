import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getLoginStatus } from '../utilities/api';

export const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('test');

    if (!stripe || !elements) {
      // Checks if stripe and elements has loaded before returning form
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log('[PaymentMethod]', payload);
  };

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
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit"> Pay </button>
      </form>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default PaymentPage;
