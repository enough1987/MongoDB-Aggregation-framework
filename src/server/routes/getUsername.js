
const express = require('express');
const router = express.Router();

const os = require('os');


router.get('/getUsername', (req, res) => res.json({ username: os.userInfo().username }));


module.exports = router;
