// Importing required modules
const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); // Import passport-local strategy configuration
const MongoDBStore=require('connect-mongodb-session')(session);


// Use express.urlencoded middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Serve static assets from the 'assets' directory
app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set the view engine and the views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Configure session and store using connect-mongo
const store= new MongoDBStore(
    {
        // database name its only taking url 
        uri: 'mongodb://localhost/habbit_tracker_development',
        collection: 'mySession'
    },
    function(err) {
        console.log(err || 'connect-mongodb setup ok');
    }
);

app.use(session(
    {
        name: 'habbit-tracker',
        secret: 'something',   //secret key name for encrypting the cookie
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100 // Cookie expiration time (in milliseconds)
        },
        store: store,
    }
));

// Initialize and use Passport authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated user in locals for views
app.use(passportLocal.setAuthenticatedUser);

// Middleware for routing
app.use('/', require('./routes/'));

// Start the server
app.listen(PORT, function(err) {
    if (err) {
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server is listening on port ${PORT}`);
});
