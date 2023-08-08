const User=require('../models/users');

module.exports.profile = function(req, res)
{

    return res.render('profile',{
        title: 'User Profile',

    });
}

module.exports.signUp = function(req, res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    return res.render('sign_up',{
        title: 'Sign Up'
    });
}

module.exports.singIn = function(req, res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    } 
    return res.render('sign_in',{
        title: 'Sign In'
    });
}

// get user data and create user 
module.exports.create =  function(req, res)
{
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    .then((user)=>
    {
        if(!user)
        {
            User.create(req.body)
            .then((user)=>{
                console.log('new user created');
                return res.redirect('/users/sign-in');
            })
            .catch((err)=>
            {
                console.log(`Error in creating a user ${err}`);
                return res.redirect('back');
            });
        }
        else
        {
            console.log('this user already exist');
            return res.redirect('back');
        }
    })
    .catch((err)=>
    {
        console.log(`Error in finding a user in database ${err}`);
        return res.redirect('back');
    });
} 

// sign in and create a session for user
module.exports.createSession = function(req, res)
{
    return res.redirect('/users/profile');
}

// sign out
module.exports.destroySession = function(req, res)
{
    req.logout(function(err) {
        if (err) {
            console.log('Error logging out:', err);
            return res.redirect('/');
        }
        return res.redirect('/');
    });
}
