const express = require('express');
const os = require('os');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
  name: String,
  lastName: String,
  proffesion: String,
  age: Number,
  posts: [{type: String}]
});

mongoose.connect('mongodb://test123:test123@ds123372.mlab.com:23372/aggregation');
const User = mongoose.model('User', userScheme);

const user = new User({
  name: 'Bill',
  lastName: 'Test',
  proffesion: 'Test',
  age: 41,
  posts: [
    'Hello', 'Yes I can'
  ]
});

user.save((err) => {
  mongoose.disconnect();

  if(err) return console.log(err);
  console.log('User saved', user);
});

server.listen(8080, () => console.log('Listening on port 8080!'));

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.json({ username: os.userInfo().username }));

app.get('/api/getAggregatedData', (req, res) => res.json({ username: os.userInfo().username }));


io.on('connection', (socket) => {
  socket.on('client-msg', (data) => {
    console.log(' client msg', data);
  });
  setInterval(() => {
    socket.emit('server-msg', { time: new Date() });
  }, 1000);
});
