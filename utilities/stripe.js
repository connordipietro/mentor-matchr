const { Stripe } = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

const createCustomer = async ({ email }) => {
  // Check to see if customer already exists in stripe
  const { data } = await stripe.customers.list({ email });
  return data.length === 0 ? stripe.customers.create({ email }) : data[0];
};

const associatePaymentMethod = async ({ customer, id }) =>
  stripe.paymentMethods.attach(id, { customer });

const createSubscription = async ({ customer, payment, price }) =>
  stripe.subscriptions.create({
    customer,
    default_payment_method: payment,
    items: [{ price }],
  });

module.exports = { createCustomer, associatePaymentMethod, createSubscription };
