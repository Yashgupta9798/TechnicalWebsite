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
//* single user edit Logic (only to get the info of the user when edit button is clicked)
//*------------------------------
const getUserById = async (req, res) =>{
    try {
        // console.log("user id from the frontend",req.params.id);
        const id = req.params.id;// we are using params here because the id coming form the frontend to delete the perticular use is in the url
        const data = await User.findOne({_id : id}, {password:0}); //we are saying that _id = id
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}



//*------------------------------
//* single user update Logic// to update the existing user info after edit button
//*------------------------------
const updateUserById = async (req, res) =>{
    try {
        const id = req.params.id;//kismay update kerna hai
        const updatedUserData = req.body;//kis data se update kerna hai wo form fill kerte wakt ayega

        const updatedData = await User.updateOne({_id:id}, {$set: updatedUserData,})//here User is the model
        return res.status(200).json(updatedData);
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

//*------------------------------
//* contacts delete Logic
//*------------------------------
const deleteContactById = async (req, res) =>{
    try {
        const id = req.params.id;// we are using params here because the id coming form the frontend to delete the perticular use is in the url
        await Contact.deleteOne({_id : id}); //we are saying that _id = id
        return res.status(200).json({message:"Contact Deleted Successfully"});
    } catch (error) {
        console.log(error);
    }
}


module.exports = {getAllUsers,getAllContacts, deleteUserById,getUserById, updateUserById, deleteContactById};