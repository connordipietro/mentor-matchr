// Imports environment variabls
require('dotenv').config();

// Imports passport strategy
require('./strategies/google');

const session = require('express-session');

// Imports express, mmongooose, and http
const MongoStore = require('connect-mongo');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const util = require('util');

// Imports socket.io

// Imports middleware
const { urlencoded } = require('express');
const passport = require('passport');
const cors = require('cors');

// Imports deployment necesities
const path = require('path');

// Establishes mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(`error connecting to db ${err}`));

// Initiated express
const app = express();

// Server set up
const server = http.createServer(app);

// SocketIO set up
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

// Registers body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(urlencoded({ extended: false, limit: '10mb' }));

// Registers session middleware
app.use(
  session({
    cookie: {
      maxAge: 3600000 * 24, // one day
    },
    saveUninitialized: false,
    resave: false,
    secret: 'asdlkjewoiuoiuwe',
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// Registers passport auth middleware
app.use(passport.initialize());
app.use(passport.session());

// Registers cors headers
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

// Imports router
const routes = require('./routes/index');

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  // Serve production assets
  app.use(express.static('client/build'));

  // Serve index.html from /build for base route (catch all)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Socket events, same as client side
const NEW_MESSAGE_EVENT = 'new-message-event';
const NEW_TEXT_EDITOR_EVENT = 'new-text-editor-event';
const NEW_TEXT_EDITOR_THEME = 'new-text-editor-theme';
const NEW_TEXT_EDITOR_LANGUAGE = 'new-text-editor-language';

// For creating unique socket room based on matchId
const Connections = require('./database/models/connections');

io.on('connection', async (socket) => {
  let chatRoom;
  let workSpace;
  let matchId;
  // Creates a socket room with the match id of the current matched users
  await socket.on('matchId', async function (socketInfo) {
    matchId = socketInfo.matchId;
    if (socketInfo.type === 'chatRoom') {
      chatRoom = `${socketInfo.matchId}chatRoom`;
      socket.join(chatRoom);
    }
    if (socketInfo.type === 'workSpace') {
      workSpace = `${socketInfo.matchId}workSpace`;
      socket.join(workSpace);
    }
  });
  // Chat room message event
  socket.on(NEW_MESSAGE_EVENT, async (data) => {
    await Connections.findOneAndUpdate(
      { _id: matchId },
      { $push: { chatLog: data } },
      { new: true }
    );

    io.in(chatRoom).emit(NEW_MESSAGE_EVENT, data);
  });

  // Text editor change event
  socket.on(NEW_TEXT_EDITOR_EVENT, async (data) => {
    io.in(workSpace).emit(NEW_TEXT_EDITOR_EVENT, data);
  });

  // Text editor theme change event
  socket.on(NEW_TEXT_EDITOR_THEME, async (data) => {
    io.in(workSpace).emit(NEW_TEXT_EDITOR_THEME, data);
  });

  socket.on(NEW_TEXT_EDITOR_LANGUAGE, async (data) => {
    io.in(workSpace).emit(NEW_TEXT_EDITOR_LANGUAGE, data);
  });

  socket.on('disconnect', () => {
    if (chatRoom) {
      socket.leave(chatRoom);
    }
    if (workSpace) {
      socket.leave(workSpace);
    }
  });
});

// Pull into own routes files
/* 

app.get('/', (req, res) => {
  if (req.session.authenticated) {
    // User is authenticated
    res.send({ status: 200, session: req.session, id: req.sessionID });
  } else {
    // User has not been authenticated
    res.send({ status: 200, session: req.session, id: req.sessionID });
  }
}); */
