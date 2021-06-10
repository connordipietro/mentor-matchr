import axios from 'axios';
import { config } from '../config/constants';

const credentials = {
  withCredentials: true,
};

export const getLoginStatus = () =>
  axios.get(config.url.API_AUTH_STATUS, {
    headers: { Pragma: 'no-cache' },
    withCredentials: true,
  });

export const setPaymentMethod = (data) =>
  axios.post(config.url.API_PAYMENT_METHOD_CREATE, data, credentials);

export const newSubscription = (data) =>
  axios.post(config.url.API_NEW_SUBCRIPTION_POST, data, credentials);

export const getAdminStatus = () =>
  axios.get(config.url.API_ADMIN_STATUS, credentials);

export const checkIfBanner = () =>
  axios.get(config.url.API_CHECK_IF_BANNER, credentials);

export const postBanner = (data) =>
  axios.post(config.url.API_POST_BANNER, data, credentials);

export const logout = () => axios.get(config.url.API_LOGOUT, credentials);
console.log(config.url.API_LOGOUT);

// Auth status check for redux store
export const GET_AUTH_STATUS = 'GET_AUTH_STATUS';

export function getAuthStatus() {
  return axios
    .get(config.url.API_AUTH_STATUS, {
      headers: { Pragma: 'no-cache' },
      withCredentials: true,
    })
    .then((response) => ({
      type: GET_AUTH_STATUS,
      payload: response,
    }));
}
