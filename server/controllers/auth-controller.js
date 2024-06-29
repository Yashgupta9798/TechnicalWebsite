// controllers are used for controlling the incomming requests means what will happen inside the route

const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

//*-------------------------
//Home Logic
//*-------------------------

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to series by tech");
  } catch (error) {
    console.log(error);
  }
};

//*---------------------------
//registration logic
//*---------------------------

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;
    // if(!username) console.log("please give username");
    if(!username || !phone) throw e;
    //checking existance
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    // const saltRounds = 10;
    // const hash_passowrd = await bcrypt.hash(password, saltRounds);
    //edit---now we are using bcrypt form user model

    const userCreated = await User.create({
      username,
      email,
      phone,
      // password:hash_passowrd //pass is equal to hash password //edited--now we are using bcrypt from user model
      password,
    });

    res
      .status(201)
      .json({
        // message: userCreated,//also show the data in the postman screen that is present in the userCreated or we can directly use req.body to print
        message: "registration successfull",
        token: await userCreated.generateToken(),//generateToken is in the user-model.js
        userId: userCreated._id.toString(),//as we know jwt works in string so need to convert it same as _id but in string type
      }); 
    } catch (error) {
        // res.status(400).send({ msg: "internal server error" });//edit--now we made a error-middleware
        next(error); //for error-middleware
    }
};


//*---------------------------
//User login logic
//*---------------------------

const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email})
        //this not only give the email rather it gives whole user data
        console.log(userExist);
        if(! userExist){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        // const user = await bcrypt.compare(password,userExist.password);//now this is shifted to the user-model
        const user = await userExist.comparePassword(password);//this function is in user-model
        if(user){
            res
            .status(200)
            .json({
                message: "Login Successfull",
                token: await userExist.generateToken(),//we need token in both login and registration
                userId: userExist._id.toString(),
            }); 
        }else{
            res.status(401).json({message:"Invalid email or password"})
        }
    } catch (error) {
        res.status(500).json("login failed");
        // next(error);

    }
}


//*---------------------------
//User logic -->to send user data
//*---------------------------

const user = async (req,res) =>{
  try {
    const userData = req.user; // it comes from the auth middleware
    console.log(req.user);
    // res.status(200).json({msg:"hi user"}); //checking if the route is working or not
    return res.status(200).json({userData});
  } catch (error) {
    console.log(`error form the user route ${error}`)
  }
}




module.exports = { home, register,login, user };
