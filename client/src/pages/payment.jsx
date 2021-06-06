import { useEffect } from 'react';
import { getLoginStatus } from '../utilities/api';

export const PaymentPage = () => {
  useEffect(() => {
    getLoginStatus()
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  });

  return <div>Payment Page</div>;
};
