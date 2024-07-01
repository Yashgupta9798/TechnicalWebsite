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
//* user delete Logic
//*------------------------------
const deleteUserById = async (req, res) =>{
    try {
        // console.log("user id from the frontend",req.params.id);
        const id = req.params.id;// we are using params here because the id coming form the frontend to delete the perticular use is in the url
        await User.deleteOne({_id : id}); //we are saying that _id = id
        return res.status(200).json({message:"Users Deleted Successfully"});
    } catch (error) {
        console.log(error);
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


module.exports = {getAllUsers,getAllContacts, deleteUserById};