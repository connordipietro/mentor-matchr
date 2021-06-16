import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { setPaymentMethod } from '../utilities/api';
import './style/stripe-form.css';
import '../pages/pages.css';

export const StripeForm = () => {
  const [error, setError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Return if card field empty
    /*  if (event.target[0].value === '') {
      setError('Please enter in your payment information to continue');
      return;
    } */
    // Return if stripe or elements not loaded
    if (!stripe || !elements) {
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
          setPaymentMethod({ id: result.paymentMethod.id });
        }
      })
      .then(function (result) {
        // Handle server response
      });
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
