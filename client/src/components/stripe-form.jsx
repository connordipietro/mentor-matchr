import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const StripeForm = () => {
  const [error, setError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('test');

    if (!stripe || !elements) {
      // Checks if stripe and elements have loaded before returning form
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
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
