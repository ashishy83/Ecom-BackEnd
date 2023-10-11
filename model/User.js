const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'is required field'],

    },
    password:{
        type:String,
        required: [true,'is required field'],
        select: false,
        },
    email:{
        type : String ,  
        required:[ true ,'is required field'],
        unique: true,
        lowercase: true,
    }
    },
    {timestamps: true}
)

const User = mongoose.model("user",userSchema);

module.exports = User;