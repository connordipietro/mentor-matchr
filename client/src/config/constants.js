const prod = {
  url: {
    API_AUTH_GOOGLE: `https://tiered-content.herokuapp.com/api/auth/google`,
  },
};

const dev = {
  url: {
    API_AUTH_GOOGLE: `http://localhost:5000/api/auth/google`,
  },
};

export const config = process.env.NODE_ENV === `development` ? dev : prod;
