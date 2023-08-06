const User=require('../models/users');

module.exports.profile = function(req, res)
{
    return res.render('profile',{
        title: 'User Profile'
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
module.exports.create = async function(req, res)
{
    if(req.body.password != req.body.confirm_password)
    {
        console.log('password and confirm password should be same');
        return res.redirect('back');
    }

    const user =await User.findOne({email: req.body.email})

    try
    {
        // if user not found then create new user
        if (!user)
        {
            await User.create(req.body)
            console.log('new user created');
            return res.redirect('/users/sign-in');
        }
        else
        {
            console.log('this user is already exist');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log(`Error in creating user ${err}`);
        return res.redirect('back');
    }
} 

// sign in and create a session for user
module.exports.createSession = function(req, res)
{
    return res.redirect('/users/profile');
}