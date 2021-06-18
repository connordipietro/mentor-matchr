import { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { newSubscription } from '../utilities/api';
import { LoadingSpinner } from '../components/index';

export const ProductsPage = () => {
  const stripePriceId = {
    perMonth: 'price_1IztDDF6tBtQLmcjuqmPUo00',
    perYear: 'price_1J0AxVF6tBtQLmcjeaBtQfga',
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleYearlySubClick = async () => {
    setLoading(true);
    const payment = await newSubscription({
      priceId: stripePriceId.perYear,
    });
    if (payment.status === 200) {
      setSuccess(true);
    }
    setLoading(false);
  };
  const handleMonthlySubClick = async () => {
    setLoading(true);
    const payment = await newSubscription({
      priceId: stripePriceId.perMonth,
    });
    if (payment.status === 200) {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <br />
      <Button
        variant="outlined"
        onClick={handleYearlySubClick}
        disabled={loading}
      >
        Recurring Tip of $100.00/yr
      </Button>
      <br />
      <br />
      <Button
        variant="outlined"
        onClick={handleMonthlySubClick}
        disabled={loading}
      >
        Recurring Tip of $9.99/mo
      </Button>
      <br />
      <br />
      {success ? (
        <Typography variant="h6">Your payment was successful</Typography>
      ) : null}
      {loading ? <LoadingSpinner loading={loading} /> : null}
    </div>
  );
};
