const Contact = require("../models/contact-model");

const contactForm = async(req,res) =>{
    try {
        const response = req.body;
        await Contact.create(response);//here the Contact is the collection name
        // console.log(response);
        return res.status(200).json({message: "message send successfully"});
    } catch (error) {
        return res.response(500).json({message: "message not delivered"});
    }
}

module.exports = contactForm;