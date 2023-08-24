const mongoose = require('mongoose');

const uri = process.env.MONGO_DB_CLOUD_SERVER;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db=mongoose.connection;

db.on('error', console.error.bind(console, "error in connecting to mongodb"));

db.once('open', function()
{
    console.log('Connected to database ');
});

module.exports = db;