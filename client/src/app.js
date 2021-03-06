import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {
  LoginPage,
  PaymentPage,
  ProductsPage,
  AdminPage,
  HomePage,
  AccountPage,
  MatchesPage,
  SettingsPage,
  PairProgramming,
} from './pages';
import { CreateAccountPage } from './pages/create-account';
import { EditAccountPage } from './pages/edit-account';
import { ConnectionsPage } from './pages/connections';
import Banner from './components/banner/banner';
import MenuBar from './components/nav/menu-bar';

const stripePromise = loadStripe(
  'pk_test_51IxgMNF6tBtQLmcj8F8QFcsxYnXfhn8g1Q4xwS0DMW5WVpu7mwj7YsY9MpKaKQX9Bw9FrWmilb23M0huqfpwI92p00jUV5Ti5c'
);
function App() {
  return (
    <>
      <Router>
        <Banner />
        <MenuBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/matches" component={MatchesPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/payment">
            <Elements stripe={stripePromise}>
              <PaymentPage />
            </Elements>
          </Route>
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/create-account" component={CreateAccountPage} />
          <Route exact path="/edit-account" component={EditAccountPage} />
          <Route exact path="/connections" component={ConnectionsPage} />
          <Route path="/pair-programming/:id" component={PairProgramming} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
