
const express = require('express');

const router = express.Router();
const async = require('async');
const fs = require('fs');
const path = require('path');


router.get('/async/mapLimit', (req, res) => {
  const filesNames = Array(100).fill().map(() => 'test.txt');

  async.mapLimit(filesNames, 5, (filePath, callback) => {
    fs.readFile(path.resolve(__dirname, filePath), 'utf8', (err, data) => {
      if (err) {
        return callback(err);
      }
      callback(null, data);
    });
  },
  (err, results) => {
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
    if (err) {
      return res.json({ err });
    }
    res.io.emit('server-msg', { msg: 'async parallel route responded ', data: results });
    res.json({ results });
  });
});


router.get('/async/parallel', (req, res) => {
  async.parallelLimit([
    (callback) => {
      setTimeout(() => {
        callback(null, 'one');
      }, 200);
    },
    (callback) => {
      setTimeout(() => {
        callback(null, 'two');
      }, 100);
    }
  ],
  // optional callback
  (err, results) => {
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
    if (err) {
      return console.log(err);
    }
    res.io.emit('server-msg', { msg: 'async parallelLimit route responded ', data: results });
    res.json({ results });
  });
});

module.exports = router;
