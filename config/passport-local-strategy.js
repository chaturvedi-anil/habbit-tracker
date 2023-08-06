const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
// authentication using passport js 
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
    },
    async function(email, password, done)
    {
        //find a user and establish the identity
        const user= await User.findOne({email:email}); 
        try
        {
            if(!user || user.password != password)
            {
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        }
        catch(err)
        {
            console.log('Erorr in finding user --> passport');
            return done(err);
        }
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done)
{
    done(null, user.id);    
});

// deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done)
{
    const user = User.findById(id);

    try
    {
        return done(null, user);
    }
    catch(err)
    {
        console.log(`Error in funding the user in deserializeUser function `);
        return done(null, err);
    }
});

// check if user is authenticated or not
passport.checkAuthentication = function(req, res, next)
{
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated())
    {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
        console.log(res.locals.user);
    }

    next();
}

module.exports = passport;