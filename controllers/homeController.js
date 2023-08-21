const Habbit = require('../models/habbits');

// Calculate the date and day information for a given offset from today
function getDayInfo(offset) {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offset);

    const formattedDate = targetDate.toLocaleDateString('pt-br', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][targetDate.getDay()];

    return { date: formattedDate, day: dayName };
}

module.exports.home = async function(req, res)
{
    await Habbit.find()
    .select('-updatedAt -createdAt -__v')
    .sort({ _id: -1 })
    .then(habbits => 
    {
        // Calculate the next 7 days and their corresponding day names
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(getDayInfo(i));
        }
        
        // Render the "habit" template and pass habits and days as variables
        res.render('home', 
        { 
            title: 'Home',
            habbits: habbits, 
            days 
        });
    })
    .catch(err => 
    {
        console.error('Error fetching habits:', err);
        res.status(500).send('Internal Server Error');
    });
}
// module.exports.home = async function(req, res)
// {
//     try 
//     {
//         // if user is signed in then if condition will execute
//         if(res.locals.user)
//         {
//             // res.locals.user is come form passport-local-strategy
//             const habbitUser = res.locals.user._id;
//             const habbitList = await Habbit.find({users:habbitUser});
//             if (!habbitList)
//             {
//                 console.log('User not found');
//             }

//             return res.render('home', {
//                 title: 'Home',
//                 habbitList
//             });
//         }
//         // if user is not signed in then else condition will execute
//         else
//         {
//             return res.redirect('/users/sign-in');
//         }
//     } 
//     catch(err) 
//     {
//         console.error(`Error fetching user: ${err}`);
//     }
// }