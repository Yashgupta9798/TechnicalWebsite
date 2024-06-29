// all the mongo related works

const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin";
const URI = process.env.MONGODB_URI;

const connectDb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("mongoDb connected");
    } catch (error) {
        console.error("mongo error");
        process.exit(0);
    }
};

module.exports  = connectDb;
