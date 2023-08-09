const Habbit = require('../models/habbits');

module.exports.home = async function(req, res)
{
    console.log(req.user);
    try 
    {
        const habbit = await Habbit.find({users: req.user._id});
        if (!habbit)
        {
            console.log('User not found');
        }

        return res.render('home', {
            title: 'Home',
            habbitList: habbit
        });
    } 
    catch(err) 
    {
        console.error('Error fetching user:', err);
    }
}