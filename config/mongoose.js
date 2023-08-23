const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL_LOCAL);

const db=mongoose.connection;

db.on('error', console.error.bind(console, "error in connecting to mongodb"));

db.once('open', function()
{
    console.log('Connected to database ');
});

module.exports = db;