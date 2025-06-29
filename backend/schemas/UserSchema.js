const { Schema } = require("mongoose");

const UserSchema = new Schema({
    name : {type : String, required: true},
    email : {type : String, required: true, unique: true},
    password : {type : String, required: true},
    isAccountVerified : {type : Boolean, default: false},
})

module.exports = { UserSchema };