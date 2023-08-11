const User = require('../models/users');
const Habbit = require('../models/habbits'); 

// create habbit in db
module.exports.createHabbit =async function(req, res)
{
    let habbit = await Habbit.findOne({content: req.content});
    if(!habbit)
    {
        Habbit.create({
            users: req.user._id,
            content: req.body.content
        })
        .then((newHabbit)=>
        {
            User.newHabbit.push(newHabbit);
            User.save();
            console.log('new habbit created');
            return res.redirect('back');
        })
        .catch((err)=>
        {
            console.log(`Error in creating habbit ${err}`);
            return res.redirect('back');
        });
    }
    else
    {
        console.log('this habbit already exist');
        return res.redirect('back');
    }
}

module.exports.deleteHabbit = function(req, res)
{
    Habbit.findById(req.params.id)
    .then((habbit)=>
    {
        // .id means converting the object id into string
        if(habbit.users.toString() === req.user.id)
        {
            // delete habbit
            habbit.deleteOne();

            // delete habbit from habbits array from users collection
            User.findOneAndUpdate({_id: req.user.id}, {$pull:{habbits: req.params.id}})
            .then((updatedUser)=>
            {
                console.log('habit deleted from user collection');
                // console.log(updatedUser);
                return res.redirect('/');
            })
            .catch((err)=>
            {
                console.log(`Error in deleting the habbits from user ${err}`);
                return res.redirect('/');
            });
        }
        else
        {
            console.log('if condition is not true');
        }
    })
    .catch((err)=>
    {
        console.log(`Error in finding habbit in habbit schema ${err}`);
        return res.redirect('/');
    });
}