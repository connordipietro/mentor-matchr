const router = require('express').Router();

const Connections = require('../../database/models/connections');

// /api/user/connections/update
router.post('/update', async (req, res) => {
  if (req.user) {
    const { id } = req.user;
    if (!id) return res.sendStatus(400);

    // Check if user pair already exists, initiated by user
    const checkIfCurrentUserInitiated = await Connections.findOne({
      sender: req.user.email,
      recipient: req.body.email,
    });

    // Check if user pair exists, initiated by another user
    const checkIfOtherUserInitiated = await Connections.findOne({
      sender: req.body.email,
      recipient: req.user.email,
    });

    // User pair doesn't have any existing connections, create one
    if (!checkIfCurrentUserInitiated && !checkIfOtherUserInitiated) {
      const initiate = await Connections.create({
        sender: req.user.email,
        recipient: req.body.email,
        status: 'initiated',
      });

      return res.send({ status: 200, connections: initiate });
    }

    // If other user initiated the request, update the status and send to front end
    // Update the status and send to front end
    if (checkIfOtherUserInitiated) {
      const { status } = checkIfOtherUserInitiated;
      if (status === 'initiated') {
        const update = await Connections.findOneAndUpdate(
          { sender: req.body.email, recipient: req.user.email },
          {
            $set: {
              status: 'accepted',
            },
          },
          {
            new: true,
          }
        );
        console.log(update);
        return res.send({ status: 200, connections: update });
      }

      return res.send({ status: 200 });
    }
    return res.sendStatus(401);
  }
});

// /api/user/connections/get
router.post('/get', async (req, res) => {
  if (req.user) {
    const { id } = req.user;
    if (!id) return res.sendStatus(400);

    const checkIfCurrentUserInitiated = await Connections.findOne({
      sender: req.user.email,
      recipient: req.body.email,
    });

    const checkIfOtherUserInitiated = await Connections.findOne({
      sender: req.body.email,
      recipient: req.user.email,
    });

    // Connection doesn't exist yet
    if (!checkIfCurrentUserInitiated && !checkIfOtherUserInitiated) {
      res.send({ status: 200, connections: null });
      return;
    }

    // Request hasn't been initiated
    if (checkIfCurrentUserInitiated) {
      res.send({ status: 200, connections: checkIfCurrentUserInitiated });
      return;
    }

    if (checkIfOtherUserInitiated) {
      res.send({ status: 200, connections: checkIfOtherUserInitiated });
      return;
    }
  }
  return res.sendStatus(401);
});

// /api/user/connections/get/accepted
router.post('/get/accepted', async (req, res) => {
  if (req.user) {
    const { id } = req.user;
    if (!id) return res.sendStatus(400);

    const checkIfCurrentUserInitiated = await Connections.find({
      sender: req.user.email,
      status: 'accepted',
    });
    console.log(checkIfCurrentUserInitiated);

    const checkIfOtherUserInitiated = await Connections.find({
      recipient: req.user.email,
      status: 'accepted',
    });
    console.log(checkIfOtherUserInitiated);

    const results = {};

    if (checkIfCurrentUserInitiated) {
      const initiatedMatches = checkIfCurrentUserInitiated.map(
        (match) => match.recipient
      );
      const initiatedMatchIds = checkIfCurrentUserInitiated.map(
        (match) => match._id
      );
      console.log(initiatedMatchIds);
      results.initiated = initiatedMatches;
      results.acceptedIds = initiatedMatchIds;
    }

    if (checkIfOtherUserInitiated) {
      const acceptedMatches = checkIfOtherUserInitiated.map(
        (match) => match.sender
      );
      const acceptedMatchIds = checkIfOtherUserInitiated.map(
        (match) => match._id
      );
      results.accepted = acceptedMatches;
      results.initiatedIds = acceptedMatchIds;
    }
    console.log(results);
    return res.send({ status: 200, connections: results });
  }

  return res.sendStatus(401);
});

module.exports = router;
