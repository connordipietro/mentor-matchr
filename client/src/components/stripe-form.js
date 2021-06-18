import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Typography } from '@material-ui/core';
import { setPaymentMethod } from '../utilities/api';
import './style/stripe-form.css';
import '../pages/pages.css';
import { LoadingSpinner } from './style/loading-spinner';
import { ProductsPage } from '../pages';

export const StripeForm = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState();

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
    setLoading(true);
    await stripe
      .createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })
      .then(function (result) {
        if (result.error) {
          setError(result.error.message);
          setLoading(false);
        } else {
          setError(null);
          setSuccess(true);
          setLoading(false);
          // Send paymentMethod.id to server
          setPaymentMethod({ id: result.paymentMethod.id });
        }
      })
      .then(function (result) {
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <div>
      {error ? <div>{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange} />
        <br />
        <br />
        <Button type="submit" variant="outlined">
          Add Card
        </Button>
      </form>
      {success ? (
        <>
          <Typography variant="h6">
            You succesfully added a payment method.
          </Typography>
          <ProductsPage />
        </>
      ) : null}
      {loading ? <LoadingSpinner loading={loading} /> : null}
    </div>
  );
};
