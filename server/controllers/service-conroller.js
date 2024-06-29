//this file is for controlling the service route req

const Service = require("../models/service-model");//! for getting the data from the server

const services = async (req, res) =>{
    try {
        const response = await Service.find();//finding the data that is stored in the Service collection
        if(!response){
            //Handle the case where no document was found
            req.status(404).json({msg:"no services found"});
            return ;
        }
        res.status(200).json({message:response});
    } catch (error) {
        console.log("services:",error);
    }
}

module.exports = services;