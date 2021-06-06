import axios from 'axios';
import { config } from '../config/constants';

const credentials = {
  withCredentials: true,
};

export const getLoginStatus = () =>
  axios.get(config.url.API_AUTH_STATUS, credentials);
