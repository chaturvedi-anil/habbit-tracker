const mongoose = require('mongoose');

const habbitSchema = new mongoose.Schema({
    users:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
    },
    content:
    {
        type: String,
        required: true
    },
    dates:
    [
        {
            date: String,
            complete: String
        }
    ]
}, 
{
    timestamp: true
});

const Habbit = mongoose.model('Habbit', habbitSchema);

module.exports = Habbit;