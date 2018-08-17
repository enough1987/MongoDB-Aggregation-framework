
const express = require('express');

const router = express.Router();

const os = require('os');


router.get('/getUsername', (req, res) => {
  res.io.emit('server-msg', 'getUsername route responded ');
  res.json({ username: os.userInfo().username });
});


module.exports = router;
