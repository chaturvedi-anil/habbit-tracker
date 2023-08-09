const User = require('../models/users');
const Habbit = require('../models/habbits'); 

// create habbit in db
module.exports.createHabbit =async function(req, res)
{
    console.log(req.body);
    let habbit = await Habbit.findOne({content: req.content});
    if(!habbit)
    {
        console.log(req.user);
        Habbit.create({
            user: req.user._id,
            content: req.body.content
        })
        .then((newHabbit)=>
        {
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

// delete habbit from db 
module.exports.deleteHabbit = function(req, res)
{

}