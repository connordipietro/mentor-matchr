const prod = {
  url: {
    API_AUTH_GOOGLE: `https://tiered-content.herokuapp.com/api/auth/google`,
    API_AUTH_STATUS: `https://tiered-content.herokuapp.com/api/auth/status`,
    API_PAYMENT_METHOD_CREATE: `https://tiered-content.herokuapp.com/api/payments/method/create`,
  },
};

const dev = {
  url: {
    API_AUTH_GOOGLE: `http://localhost:5000/api/auth/google`,
    API_AUTH_STATUS: `http://localhost:5000/api/auth/status`,
    API_PAYMENT_METHOD_CREATE: `http://localhost:5000/api/auth/statusapi/payments/method/create`,
  },
};

export const config = process.env.NODE_ENV === `development` ? dev : prod;
