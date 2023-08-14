const User = require('../models/users');
const Habbit = require('../models/habbits'); 

// Create a new habit and save it to the user's habbits array
async function createNewHabbit(req, res) {
    try {
        // Create a new Habbit using the Habbit model
        let newHabbit = await Habbit.create({
            users: req.user._id,
            content: req.body.content
        });

        // Push the newHabbit into the User's habbits array
        User.habbits.push(newHabbit);

        // Save the updated User object (assuming User is a Mongoose model)
        await User.save();

        // Flash a success message and redirect back
        req.flash('success', 'New habit created');
        return res.redirect('back');
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error(error);

        // Flash an error message and redirect back
        req.flash('error', 'Error creating new habit');
        return res.redirect('back');
    }
}

// Handle the creation of a new habit
module.exports.createHabbit = async function(req, res) {
    try {
        console.log('try ', req.body.content);
        
        // Find if the habit already exists
        let habbit = await Habbit.findOne({ content: req.body.content });
        console.log('try habbit ', habbit);

        if (!habbit) {
            // If habit doesn't exist, create a new habit
            await createNewHabbit(req, res);
        } else {
            if (!habbit.users.equals(req.user._id)) {
                // If habit exists but belongs to a different user, create a new habit
                await createNewHabbit(req, res);
            } else {
                // If habit exists and belongs to the same user, show error message
                req.flash('error', 'This habit already exists');
                return res.redirect('back');
            }
        }
    } catch (err) {
        console.log(`Error in creating habit: ${err}`);
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