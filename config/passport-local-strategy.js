const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done)
    {
        // find the user and establish the identity
        User.findOne({email: email})
        .then((user)=>
        {
            // match the password 
            if(!user || user.password != password)
            {
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            // established the connection to db 
            return done(null, user);
        })
        .catch((err)=>
        {
            console.log(`Error in finding the user in db ${err}`);
            return done(err);
        });
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done)
{
    done(null, user.id); 
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done)
{
    User.findById(id)
    .then((user)=>
    {
        return done(null, user);
    })
    .catch((err)=>
    {
        console.log(`Error in finding the user in deserialize function ${err}`);
        return done(err);
    });
});

// check if the user is authenticated 
passport.checkAuthentication = function(req, res, next)
{
    // if user is authenticated, then pass the req to next function(controller's action)
    if(req.isAuthenticated())
    {
        return next();
    }

    // if not then
    return res.redirect('/users/sign-in');
}

// 
passport.setAuthenticatedUser = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        // req.user contains the current signed in user from the session cookies and we are just sending this to locals for views 
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;