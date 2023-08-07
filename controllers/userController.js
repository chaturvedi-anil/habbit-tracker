const User=require('../models/users');

module.exports.profile = function(req, res)
{
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id)
        .then((user)=>
        {
            return res.render('profile',{
                title: 'User Profile',
                user: user
            });
        })
        .catch((err)=>
        {
            console.log('user not found');
            return res.redirect('/users/sign-in');
        })
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
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
    // find the user 
    User.findOne({email: req.body.email})
    .then((user)=>
    {
        // handle password which doesn't match
        if(user.password != req.body.password)
        {
            return res.redirect('back');
        }

        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    })
    .catch((err)=>
    {
        console.log(`Error in finding a user in database ${err}`);
        return res.redirect('back');
    });
}