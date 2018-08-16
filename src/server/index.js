const express = require('express');
const os = require('os');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

//
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userScheme = new Schema({
  name: String,
  lastName: String,
  proffesion: String,
  age: Number,
  posts: [{ type: String }]
});

mongoose.connect('mongodb://test123:test123@ds123372.mlab.com:23372/aggregation');
const UserbContext = mongoose.model('User', userScheme);
//

server.listen(8080, () => console.log('Listening on port 8080!'));

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.json({ username: os.userInfo().username }));

app.get('/api/getAggregatedData', (req, res) => {
  UserbContext.aggregate([
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
  ], (err, users) => {
    res.json({ users });
  });
});


io.on('connection', (socket) => {
  socket.on('client-msg', (data) => {
    console.log(' client msg', data);
  });
  setInterval(() => {
    socket.emit('server-msg', { time: new Date() });
  }, 1000);
});
