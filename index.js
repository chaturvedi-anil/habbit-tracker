//imported express module
const express=require("express");
const cookieParser = require('cookie-parser');

//Define a port number
const PORT = process.env.PORT || 8000;
// Create an instance of express application
const app= express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// view engine setup
app.set('view engine', 'ejs');
// settinge folder for views
app.set('views', './views');

// middleware for routing
app.use('/', require('./routes/'));

// Strat the server 
app.listen(PORT, function(err)
{
    if(err)
    {
        console.log(`Error in runing the server ${err}`);
    }
    console.log(`server is listening on port ${PORT}`);
});