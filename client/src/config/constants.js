const prod = {
  url: {
    API_AUTH_GOOGLE: `https://tiered-content.herokuapp.com/api/auth/google`,
    API_AUTH_STATUS: `https://tiered-content.herokuapp.com/api/auth/status`,
    API_PAYMENT_METHOD_CREATE: `https://tiered-content.herokuapp.com/api/payment/methods/create`,
    API_NEW_SUBCRIPTION_POST: `https://tiered-content.herokuapp.com/api/subscriptions/new`,
    API_ADMIN_STATUS: `https://tiered-content.herokuapp.com/api/admin/dashboard`,
    API_CHECK_IF_BANNER: `https://tiered-content.herokuapp.com/api/admin/banner`,
    API_POST_BANNER: `https://tiered-content.herokuapp.com/api/admin/banner`,
    HOME: '',
    AVAILIBILITY: '',
    UPCOMING: '',
    SETTINGS: '',
    ABOUT: '',
    CONTACT: '',
    DONATE: '',
  },
};

const dev = {
  url: {
    API_AUTH_GOOGLE: `http://localhost:5000/api/auth/google`,
    API_AUTH_STATUS: `http://localhost:5000/api/auth/status`,
    API_PAYMENT_METHOD_CREATE: `http://localhost:5000/api/payment/methods/create`,
    API_NEW_SUBCRIPTION_POST: `http://localhost:5000/api/subscriptions/new`,
    API_ADMIN_STATUS: `http://localhost:5000/api/admin/dashboard`,
    API_CHECK_IF_BANNER: `http://localhost:5000/api/admin/banner`,
    API_POST_BANNER: `http://localhost:5000/api/admin/banner`,
    HOME: 'http://localhost:3000/home',
    AVAILIBILITY: '',
    UPCOMING: '',
    SETTINGS: '',
    ABOUT: '',
    CONTACT: '',
    DONATE: '',
  },
};

export const config = process.env.NODE_ENV === `development` ? dev : prod;
