import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { getLoginStatus } from '../utilities/api';

export const PaymentPage = ({ history }) => {
  console.log(history);
  useEffect(() => {
    getLoginStatus()
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  });

  return <div>Payment Page</div>;
};

PaymentPage.propTypes = {
  history: PropTypes.object,
};
