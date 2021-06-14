import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import MoonLoader from 'react-spinners/MoonLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const LoadingSpinner = ({ loading }) => (
  <MoonLoader
    color="red"
    loading={loading}
    css={override}
    size={50}
    speedMultiplier={0.5}
  />
);

LoadingSpinner.propTypes = {
  loading: PropTypes.bool,
};
