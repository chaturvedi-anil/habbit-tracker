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
        return res.redirect('/');
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
        return res.redirect('/');
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
            req.flash('error', 'password and confirm password should be same!');
            return res.redirect('back');
        }

        // find user email in db
        let user= await User.findOne({email: req.body.email});
        
        // if user email not found then create new user 
        if(!user)
        {
            let newUser = await User.create(req.body);
            // console.log('new user created');
            req.flash('success', 'new user created');
            return res.redirect('/users/sign-in');
        }
        // if user email is found then redirect user to singup page
        else
        {
            // console.log('this user already exist');
            req.flash('error', 'this user already exist');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        // console.log(`Error in creating a user ${err}`);
        req.flash('error', err);
        return res.redirect('back');
    }
} 

// sign in and create a session for user
module.exports.createSession = function(req, res)
{
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

// user view
module.exports.habitView = async function(req, res) 
{
    try 
    {
        // Find the user based on their ID
        const user = await User.findById(req.user._id);

        // Toggle between 'daily' and 'weekly' view
        user.view = user.view === 'daily' ? 'weekly' : 'daily';

        // Save the updated user
        await user.save();

        // Redirect back to the previous page
        return res.redirect('back');
    } 
    catch(err) 
    {
        console.error('Error changing view:', err);
        
        // Flash an error message and handle the error gracefully
        req.flash('error', 'Error changing view!');
        return res.redirect('back');
    }
};

// sign out
module.exports.destroySession = function(req, res)
{
    req.logout(function(err) {
        if (err) {
            console.log('Error logging out:', err);
            return res.redirect('/');
        }
    });

    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}
