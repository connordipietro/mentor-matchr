import { useState } from 'react';
import { newSubscription } from '../utilities/api';
import { LoadingSpinner } from '../components/index';

export const ProductsPage = () => {
  const stripePriceId = {
    perMonth: 'price_1IztDDF6tBtQLmcjuqmPUo00',
    perYear: 'price_1J0AxVF6tBtQLmcjeaBtQfga',
  };

  const [loading, setLoading] = useState(false);

  const handleYearlySubClick = async () => {
    setLoading(true);
    const { data } = await newSubscription({
      priceId: stripePriceId.perYear,
    });
    setLoading(false);
    console.log(data);
  };
  const handleMonthlySubClick = async () => {
    setLoading(true);
    const { data } = await newSubscription({
      priceId: stripePriceId.perMonth,
    });
    setLoading(false);
    console.log(data);
  };

  return (
    <div>
      <button type="button" onClick={handleYearlySubClick} disabled={loading}>
        Subscribe for $9.99/yr
      </button>
      <button type="button" onClick={handleMonthlySubClick} disabled={loading}>
        Subscribe for $1.99/mo
      </button>
      {loading ? <LoadingSpinner loading={loading} /> : null}
    </div>
  );
};
