import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const StripeForm = () => {
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

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit"> Pay </button>
    </form>
  );
};
