const prod = {
  url: {
    API_AUTH_GOOGLE: `https://tiered-content.herokuapp.com/api/auth/google`,
    API_AUTH_STATUS: `https://tiered-content.herokuapp.com/api/auth/status`,
    API_PAYMENT_METHOD_CREATE: `https://tiered-content.herokuapp.com/api/payment/methods/create`,
    API_NEW_SUBCRIPTION_POST: `https://tiered-content.herokuapp.com/api/subscriptions/new`,
  },
};

const dev = {
  url: {
    API_AUTH_GOOGLE: `http://localhost:5000/api/auth/google`,
    API_AUTH_STATUS: `http://localhost:5000/api/auth/status`,
    API_PAYMENT_METHOD_CREATE: `http://localhost:5000/api/payment/methods/create`,
    API_NEW_SUBCRIPTION_POST: `http://localhost:5000/api/subscriptions/new`,
  },
};

export const config = process.env.NODE_ENV === `development` ? dev : prod;
