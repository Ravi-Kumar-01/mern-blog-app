const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        requires: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    blogs:[{type: mongoose.Types.ObjectId, ref:"Blog", required: true}],
});

const UserModel = mongoose.model('User', userSchema); 
//users

module.exports = UserModel;