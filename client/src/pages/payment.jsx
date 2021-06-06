import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { getLoginStatus } from '../utilities/api';

export const PaymentPage = ({ history }) => {
  const [loading, setLoading] = useState(true);

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

  return !loading ? <div>Payment Page</div> : <h3>Loading...</h3>;
};

PaymentPage.propTypes = {
  history: PropTypes.object,
};
