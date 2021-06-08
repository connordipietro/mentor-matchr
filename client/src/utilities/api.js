import axios from 'axios';
import { config } from '../config/constants';

const credentials = {
  withCredentials: true,
};

export const getLoginStatus = () =>
  axios.get(config.url.API_AUTH_STATUS, credentials);

export const setPaymentMethod = (data) =>
  axios.post(config.url.API_PAYMENT_METHOD_CREATE, data, credentials);

export const newSubscription = (data) =>
  axios.post(config.url.API_NEW_SUBCRIPTION_POST, data, credentials);
