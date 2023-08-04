//imported express module
const express=require("express");

//Define a port number
const PORT = process.env.PORT || 8000;

// Create an instance of express application
const app= express();

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