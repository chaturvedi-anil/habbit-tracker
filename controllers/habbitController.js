const User = require('../models/users');
const Habbit = require('../models/habbits'); 

// Create a new habit and save it to the user's habbits array
module.exports.createHabbit = async function(req, res) 
{
    try 
    {
        // added for date
        let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
        console.log(localISOTime);
        dates.push({ date: localISOTime, complete: 'none' });

        // Create a new Habbit using the Habbit model
        let newHabbit = await Habbit.create({
            users: req.user._id,
            content: req.body.content,
            dates
        });

        // Push the newHabbit into the User's habbits array and update
        await User.updateOne({ _id: req.user._id }, { $push: { habbits: newHabbit } });

        // Flash a success message and redirect back
        req.flash('success', 'New habit created');
        return res.redirect('back');
    } 
    catch (error) 
    {
        // Handle any errors that occurred during the process
        console.error(`createHabbit ${error}`);

        // Flash an error message and redirect back
        req.flash('error', 'Error creating new habit');
        return res.redirect('back');
    }
}

module.exports.deleteHabbit = async function(req, res)
{
    try
    {
        // find habbit in habbit schema 
        let habbit = await Habbit.findOne({_id: req.params.id});

        // .id means converting the object id into string
        if(habbit.users.toString() === req.user.id)
        {
            // delete habbit
            habbit.deleteOne();

            // delete habbit from habbits array from users collection
            await User.findOneAndUpdate({_id: req.user.id}, {$pull:{habbits: req.params.id}});

            // console.log('habit deleted from user collection');
            req.flash('success', 'habbit deleted');
            // console.log(updatedUser);
            return res.redirect('/');
        }
    }
    // if any error then execute this
    catch(err)
    {
        // console.log(`Error in deleting habbit : ${err}`);
        req.flash('error', err);
        return res.redirect('/');
    }
}