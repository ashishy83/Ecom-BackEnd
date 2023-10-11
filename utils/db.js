const mongoose = require('mongoose');
const config = require('../config');


const connectDB = async() =>{
    try{
        const uri = config.MONGO_URI;

        await mongoose.connect(uri);
        console.log("Connected to Database");
    }
    catch(error){
        console.error("Error connecting to database", error);
    }
};

export default connectDB;