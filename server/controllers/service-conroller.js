//this file is for controlling the service route req

const Service = require("../models/service-model");//! for getting the data from the server
const crypto = require('crypto');//for payment gateway
const { v4: uuidv4 } = require('uuid');//for payment gateway endpoint
const axios = require('axios');


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

const createOrder = async (req, res) =>{
    const {name, mobileNumber, amount} = req.body;
    const orderId = uuidv4()

    //payment
    const paymentPayload = {
        merchantId : process.env.MERCHANT_ID,
        merchantUserId: name,
        mobileNumber: mobileNumber,
        amount : amount*100,
        merchantTransactionId: orderId,
        redirectUrl: `${process.env.redirectUrl}/?id=${orderId}`,
        redirectMode: 'POST',
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    }


    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
    const keyIndex = 1
    const string  = payload + '/pg/v1/pay' + process.env.MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'POST',
        url:process.env.MERCHANT_BASE_URL,
        headers: {
            accept : 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data :{
            request : payload
        }
    }
    try {
        const response = await axios.request(option);
        console.log(response.data.data.instrumentResponse.redirectInfo.url)
        // console.log(response);
        res.status(200).json({msg : "OK", url: response.data.data.instrumentResponse.redirectInfo.url})
    } catch (error) {
        console.log("error in payment", error)
        res.status(500).json({error : 'Failed to initiate payment'})
    }
}

const orderStatus = async (req, res) => {
    // console.log("hi");
    try {
        // console.log("Received request at /status with ID:", req.query.id);
        const merchantTransactionId = req.query.id;

        if (!merchantTransactionId) {
            return res.status(400).json({ error: "Missing transaction ID" });
        }

        const keyIndex = 1;
        const stringToHash = `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` + process.env.MERCHANT_KEY;
        const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const option = {
            method: 'GET',
            url: `${process.env.MERCHANT_STATUS_URL}/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': process.env.MERCHANT_ID
            }
        };

        axios.request(option).then((response) => {
            if (response.data.success === true){
                return res.redirect(process.env.successUrl)
            }else{
                return res.redirect(process.env.failureUrl)
            }
        })
    } catch (error) {
        console.error("Order status error:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
        res.status(500).json({ error: "Failed to check payment status", details: error.message });
    }
};


module.exports = {services, createOrder, orderStatus};