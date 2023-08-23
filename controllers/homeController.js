const Habbit = require('../models/habbits');

// Calculate the date and day information for a given offset from today
function getDayInfo(offset) 
{
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offset);

    const formattedDate = targetDate.toLocaleDateString('pt-br', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][targetDate.getDay()];

    return { date: formattedDate, day: dayName };
}

module.exports.home = async function(req, res)
{ 
    try
    {
        // console.log(res.locals.user);
        if(res.locals.user)
        {
            const habbitUser = res.locals.user._id;
            let habbitList = await Habbit.find({users:habbitUser});
            // Calculate the next 7 days and their corresponding day names
            const days = [];
            for (let i = 0; i < 7; i++) 
            {
                days.push(getDayInfo(i));
            }
            
            // Render the "habit" template and pass habits and days as variables
            res.render('home', 
            { 
                title: 'Home',
                habbits: habbitList, 
                days 
            });
        }
        else
        {
            return res.render('home', 
            { 
                title: 'Home', 
            });
        }
    }
    catch(err)
    {
        // console.error('Error fetching habbits home page :', err);
        // req.flash('error', 'Error fetching habbits');
        res.status(500).send('Internal Server Error');
    };
}

