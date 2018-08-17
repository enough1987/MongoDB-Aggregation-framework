
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
    res.json({ users });
  }, (err) => {
    res.json({ err });
  });
});

module.exports = router;
