//this file is for to control the request that is comming from the admin route

const User = require("../models/user-model");
const Contact = require("../models/contact-model");



//*------------------------------
//* getAllUsers Logic
//*------------------------------
const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find({},{password:0});//collecting all data without password
        console.log(users);
        if(!users || users.length === 0){
            return res.status(404).json({message:"No Contacts Found"});
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }

}

//*------------------------------
//* getAllContact Logic
//*------------------------------
const getAllContacts = async (req, res) =>{
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message:"No Users Found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }

}

module.exports = {getAllUsers,getAllContacts};