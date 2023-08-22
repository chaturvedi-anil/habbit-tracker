const User = require('../models/users');
const Habbit = require('../models/habbits'); 

//createhabbit function 
module.exports.createHabbit = async function(req, res) 
{
    try 
    {
        // Find an existing habit based on content and user
        let habbit = await Habbit.findOne({ content: req.body.content, users: req.user._id });
    
        if (habbit) 
        {
            // Calculate the timezone offset and get today's date in ISO format
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            const today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
    
            // Check if the habit already exists for today's date
            const habitExists = habbit.dates.some(item => item.date === today);
    
            if (habitExists) 
            {
                // If habit exists, display an error message and redirect back
                console.log("Habit exists!");
                req.flash('error', 'Habit already exists!');
                return res.redirect('back');
            } 
            else 
            {
                // If habit doesn't exist, add a new date entry
                habbit.dates.push({ date: today, complete: 'none' });
        
                // Save the updated habit
                await habbit.save();
        
                // Flash a success message and redirect back
                req.flash('success', 'Habit updated successfully');
                console.log(habbit);
                return res.redirect('back');
            }
        } 
        else 
        {
            // If the habit doesn't exist, create a new one
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            const dates = [{ date: localISOTime, complete: 'none' }];
    
            // Create a new habit
            const newHabbit = await Habbit.create(
            {
                users: req.user._id,
                content: req.body.content,
                dates
            });
    
            // Push the newHabbit into the User's habbits array and update
            await User.updateOne({ _id: req.user._id }, { $push: { habbits: newHabbit } });
            // console.log('new habbit');

            // Flash a success message and redirect back
            req.flash('success', 'New habit created');
            return res.redirect('back');
        }
    } 
    catch (err) 
    {
        // Handle any errors that occurred during the process
        console.error(`createHabit ${err}`);
    
        // Flash an error message and redirect back
        req.flash('error', 'Error creating new habit');
        return res.redirect('back');
    }
}

// status update
module.exports.statusUpdate =  async function(req, res)
{
    try 
    {
        console.log(req.habbit);
        const requestedDate = req.query.date;
        const habitId = req.query.id;

        // Find the habit by its ID
        const habbit = await Habbit.findById(habitId);

        if (!habbit) 
        {
            console.log("habbit not found.");
            return res.status(404).send("habbit not found.");
        }

        let dates = habbit.dates;
        let foundDate = false;

        // Iterate through habit dates to find the requested date
        dates.forEach(dateEntry => 
        {
            if (dateEntry.date === requestedDate) 
            {
                // Update status based on the current status
                switch (dateEntry.complete) {
                    case 'yes':
                        dateEntry.complete = 'no';
                        break;
                    case 'no':
                        dateEntry.complete = 'none';
                        break;
                    case 'none':
                        dateEntry.complete = 'yes';
                        break;
                }
                foundDate = true;
            }
        });

        // If the requested date is not found, add a new entry
        if (!foundDate) 
        {
            dates.push({ date: requestedDate, complete: 'yes' });
        }

        habbit.dates = dates;
        await habbit.save();

        console.log("Habit updated:", habbit);
        res.redirect('back');
    } 
    catch (error) 
    {
        console.error("Error updating habit:", error);
        res.status(500).send("Error updating habit.");
    }
};





// remove habbit from db
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