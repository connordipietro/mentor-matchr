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

export const createAccount = (data) =>
  axios.post(config.url.API_CREATE_USER, data, credentials);

export const getProfileInfo = (data) =>
  axios.post(config.url.API_GET_PROFILE, data, credentials);

export const getMatches = async () =>
  axios.get(config.url.API_GET_MATCHES, credentials);

export const postConnections = async (data) =>
  axios.post(config.url.API_POST_CONNECTIONS, data, credentials);

export const getConnections = async (data) =>
  axios.post(config.url.API_GET_CONNECTIONS, data, credentials);

export const getAcceptedConnections = async (data) =>
  axios.post(config.url.API_GET_ACCEPTED_CONNECTIONS, data, credentials);

export const getChatLog = async (data) =>
  axios.post(config.url.API_GET_CHAT_LOG, data, credentials);

export const postCompile = async (data) =>
  axios.post(config.url.API_COMPILE, data, credentials);

// Sends JS to google closure api for processing
const headers = { 'Content-type': 'application/x-www-form-urlencoded' };
export const postCloserApi = async (data) => {
  const request = {
    js_code: data,
    compilation_level: 'SIMPLE_OPTIMIZATIONS',
    output_format: 'json',
    formatting: 'pretty_print',
    output_info: 'warnings',
  };
  return axios.post(
    `http://closure-compiler.appspot.com/compile`,
    request,
    headers
  );
};

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
