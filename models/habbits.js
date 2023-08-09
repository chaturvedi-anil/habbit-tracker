const mongoose = require('mongoose');

const habbitSchema = new mongoose.Schema({
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