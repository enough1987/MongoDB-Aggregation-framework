const express = require('express');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const aggregateRoute = require('./routes/aggregate');
const getUsernameRoute = require('./routes/getUsername');
const asyncRoute = require('./routes/async');


app.use(express.static('dist'));

app.use((req, res, next) => {
  res.io = io;
  next();
});

app.use('/api', aggregateRoute);
app.use('/api', getUsernameRoute);
app.use('/api', asyncRoute);

io.on('connection', (socket) => {
  socket.on('client-msg', (data) => {
    console.log(' client msg', data);
  });
  setInterval(() => {
    socket.emit('server-msg-time', { time: new Date() });
  }, 1000);
});


server.listen(8080, () => console.log('Listening on port 8080 !'));
