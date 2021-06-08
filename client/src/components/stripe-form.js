import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { setPaymentMethod } from '../utilities/api';

export const StripeForm = () => {
  const [error, setError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Checks if stripe and elements have loaded before returning form
      return;
    }

    const payload = await stripe
      .createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })
      .then(function (result) {
        if (result.error) {
          setError(event.error.message);
        } else {
          setError(null);
          // Send paymentMethod.id to server
          console.log(result);
          setPaymentMethod({ id: result.paymentMethod.id });
        }
      })
      .then(function (result) {
        // Handle server response
        console.log(result);
      });
    console.log(payload);
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
    console.log(event);
  };

  return (
    <div>
      {error ? <div>{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange} />
        <button type="submit"> Pay </button>
      </form>
    </div>
  );
};
