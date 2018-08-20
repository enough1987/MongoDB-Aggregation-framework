
const express = require('express');

const router = express.Router();

const dbContext = require('../_db/DbContext');

router.get('/getAggregatedData', (req, res) => {
  dbContext.users.aggregate([
    {
      $match: {
        name: 'Bill'
      }
    },
    {
      $project: {
        name: 1, lastName: 1, proffesion: 1, age: 1, posts: 1
      }
    }
  ]).then((users) => {
    res.io.emit('server-msg', { msg: 'aggregate route responded ' });
    res.json({ users });
  }, (err) => {
    res.json({ err });
  });
});


router.get('/getPerchesesData', (req, res) => {
  dbContext.purchases.aggregate([
    {
      $match: {
        name: 'Bill'
      }
    },
    {
      $project: {
        name: 1, purchase: { name: 1, count: 1 }
      }
    }
  ]).then((percheses) => {
    res.io.emit('server-msg', { msg: 'purchases route responded ', data: percheses });
    res.json({ percheses });
  }, (err) => {
    res.json({ err });
  });
});

module.exports = router;
