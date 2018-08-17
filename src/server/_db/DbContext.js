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

const usersDbContext = mongoose.model('User', userScheme);

module.exports = {
  users: usersDbContext
};
