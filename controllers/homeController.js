const Habbit = require('../models/habbits');

module.exports.home = async function(req, res)
{
    try 
    {
        // if user is signed in then if condition will execute
        if(res.locals.user)
        {
            // res.locals.user is come form passport-local-strategy
            const habbitUser = res.locals.user._id;
            const habbitList = await Habbit.find({users:habbitUser});
            if (!habbitList)
            {
                console.log('User not found');
            }

            return res.render('home', {
                title: 'Home',
                habbitList
            });
        }
        // if user is not signed in then else condition will execute
        else
        {
            return res.redirect('/users/sign-in');
        }
    } 
    catch(err) 
    {
        console.error(`Error fetching user: ${err}`);
    }
}