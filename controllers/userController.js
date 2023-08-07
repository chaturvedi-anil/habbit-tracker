const User=require('../models/users');

module.exports.profile = function(req, res)
{
    return res.render('profile',{
        title: 'User Profile',
    });
}

module.exports.signUp = function(req, res)
{
    return res.render('sign_up',{
        title: 'Sign Up'
    });
}

module.exports.singIn = function(req, res)
{
    return res.render('sign_in',{
        title: 'Sign In'
    });
}

// get user data and create user 
module.exports.create =  function(req, res)
{
   
} 

// sign in and create a session for user
module.exports.createSession = function(req, res)
{
   
}