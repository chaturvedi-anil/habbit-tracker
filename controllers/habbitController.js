const User = require('../models/users');
const Habbit = require('../models/habbits'); 

// create habbit in db
module.exports.createHabbit =async function(req, res)
{
    try
    {
        let habbit = await Habbit.findOne({content: req.content});
        if(!habbit)
        {
            let newHabbit= await Habbit.create({
                users: req.user._id,
                content: req.body.content
            });

            User.newHabbit.push(newHabbit);
            User.save();
            console.log('new habbit created');
            return res.redirect('back');
        }
        else
        {
            console.log('this habbit already exist');
            return res.redirect('back');
        }
    }
    catch
    {
        console.log(`Error in creating habbit ${err}`);
        return res.redirect('back');
    }
}

module.exports.deleteHabbit = async function(req, res)
{
    try
    {
        // .id means converting the object id into string
        if(habbit.users.toString() === req.user.id)
        {
            // delete habbit
            habbit.deleteOne();

            // delete habbit from habbits array from users collection
            await User.findOneAndUpdate({_id: req.user.id}, {$pull:{habbits: req.params.id}});

            console.log('habit deleted from user collection');
            // console.log(updatedUser);
            return res.redirect('/');
        }
        else
        {
            console.log('if condition is not true');
        }
    }
    // if any error then execute this
    catch(err)
    {
        console.log(`Error in deleting habbit : ${err}`);
        return res.redirect('/');
    }
}