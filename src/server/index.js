const express = require('express');
const os = require('os');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080, () => console.log('Listening on port 8080!'));

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/getAggregatedData', (req, res) => res.send({ username: os.userInfo().username }));


io.on('connection', (socket) => {
  socket.on('client-msg', (data) => {
    console.log(' client msg', data);
  });
  setInterval(() => {
    socket.emit('server-msg', { time: new Date() });
  }, 1000);
});
