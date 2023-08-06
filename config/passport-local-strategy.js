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

module.exports = passport;