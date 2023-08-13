const User=require('../models/users');

module.exports.profile = function(req, res)
{

    return res.render('profile',{
        title: 'User Profile',

    });
}

module.exports.signUp = function(req, res)
{
    //if user is already signed in then redirect user to profile page 
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
    //if user is already signed in then redirect user to profile page
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    } 

    return res.render('sign_in',{
        title: 'Sign In'
    });
}

// get user data and create user 
module.exports.create = async function(req, res)
{
    try
    {
        if(req.body.password != req.body.confirm_password)
        {
            return res.redirect('back');
        }

        // find user email in db
        let user= await User.findOne({email: req.body.email});
        
        // if user email not found then create new user 
        if(!user)
        {
            let newUser = await User.create(req.body);
            console.log('new user created');
            return res.redirect('/users/sign-in');
        }
        // if user email is found then redirect user to singup page
        else
        {
            console.log('this user already exist');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log(`Error in creating a user ${err}`);
        return res.redirect('back');
    }
} 

// sign in and create a session for user
module.exports.createSession = function(req, res)
{
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/users/profile');
}

// sign out
module.exports.destroySession = function(req, res)
{
    req.logout(function(err) {
        if (err) {
            console.log('Error logging out:', err);
            req.flash('error', 'error in logout');
            return res.redirect('/');
        }
    });

    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}
