//imported express module
const express=require("express");
const path = require('path');
//Define a port number
const PORT = process.env.PORT || 8000;

// Create an instance of express application
const app= express();

// view engine setup
app.set('view engine', 'ejs');
// settinge folder for views
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(res, res)
{
    res.render('home');
})
// Strat the server 
app.listen(PORT, function(err){
    if(err)
    {
        console.log(`Error ${err}`);
    }
    console.log(`server is listening on port ${PORT}`);
});