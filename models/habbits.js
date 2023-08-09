const mongoose = require('mongoose');

const habbitSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
    },
    content:
    {
        type: String,
        required: true
    }
}, 
{
    timestamp: true
});

const Habbit = mongoose.model('Habbit', habbitSchema);

module.exports = Habbit;