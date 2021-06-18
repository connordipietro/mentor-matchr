const axios = require('axios');
const router = require('express').Router();

// /api/compile
router.post('/', async (req, res) => {
  console.log(req.body);
  const code = req.body.text;
  console.log(code);

  const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/about',
    headers: {
      'x-rapidapi-key': process.env.RAPID,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    },
  };

  const body = JSON.stringify({
    source_code: code,
    stdin: this.state.user_input,
    language_id: this.state.language_id,
  });

  axios
    .request(options,)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return res.send({ status: 200 });
});

module.exports = router;
