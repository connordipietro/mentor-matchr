import axios from 'axios';
import { config } from '../config/constants';

export const GET_AUTH_STATUS = 'GET_AUTH_STATUS';

const credentials = {
  withCredentials: true,
};

export function getAuthStatus() {
  return axios
    .get(config.url.API_AUTH_STATUS, credentials)
    .then((response) => ({
      type: GET_AUTH_STATUS,
      payload: response,
    }));
}
