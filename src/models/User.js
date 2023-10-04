const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    // blog: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: ''
    //     }
    // ],
})

const User = mongoose.model('users', userSchema);

module.exports = User