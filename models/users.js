const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    habbits:
    [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Habbits'
        }
    ],
    view: 
    {
        type: String,
        default: 'daily'
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;