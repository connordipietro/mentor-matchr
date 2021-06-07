import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { LoginPage, PaymentPage } from './pages';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/payment">
            <Elements stripe={stripePromise}>
              <PaymentPage />
            </Elements>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
