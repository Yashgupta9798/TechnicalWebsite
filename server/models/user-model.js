// this folder is for defing the model

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type: String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
})

//ENCRYPTION---BCRYPT
//This function "pre" help to run the function before the data get stored in the database and "this" keyword is used to get the value that is entered by the user
userSchema.pre("save", async function(next){
    const user = this;

    //if the password is not modified then we directly move to the storing process present in controller
    if(!user.isModified("password")){
        next();
    }

    //else we will hash the password before storing in the database
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        //updating the user password with the hashed password
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

//COMPARE THE PASSWORD
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);//here we have replaced userExist with this because that is not defined here and this contains all data
}

//JWT TOKEN
userSchema.methods.generateToken = function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY,
            {expiresIn:"30d"}
        );
    } catch (error) {
        console.error(error);
    }
};

const User = new mongoose.model("user", userSchema);

module.exports = User;