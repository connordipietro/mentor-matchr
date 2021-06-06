// Imports environment variabls
require('dotenv').config();

// Imports passport strategy
require('./strategies/google');

// Imports express, mmongooose, and http
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

// Imports middleware
const { urlencoded } = require('express');
const session = require('express-session');
const passport = require('passport');

// Imports deployment necesities
const path = require('path');

// Imports routers
const routes = require('./routes/index');

// Establishes mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(`error connecting to db ${err}`));

const app = express();

// Registers body parsing middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));

// Registers session middleware
app.use(
  session({
    cookie: {
      maxAge: 3600000 * 24, // one day
    },
    saveUninitialized: false,
    resave: false,
    secret: 'asdlkjewoiuoiuwe',
  })
);

// Registers passport auth middleware
app.use(passport.initialize());
app.use(passport.session());

// Registers coors headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Imports router
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  // Serve production assets
  app.use(express.static('client/build'));

  // Serve index.html from /build for base route (catch all)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
};

app.get('/isAuthenticated', (req, res) => {
  if (req.session.authenticated) {
    // User is authenticated
    res.send({ status: 200, session: req.session, id: req.sessionID });
  } else {
    // User has not been authenticated
    res.send({ status: 200, session: req.session, id: req.sessionID });
  }
});

// Server set up
const server = http.createServer(app);

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
