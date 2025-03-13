//this is for the service route

const express = require("express");
const {services, createOrder, orderStatus} = require("../controllers/service-conroller");

const router = express.Router();

router.route("/service").get(services);
router.route("/service/createOrder").post(createOrder);
router.route("/service/orderStatus").post(orderStatus);

module.exports = router;//! this need to be done because we need this router in the index page although this has no logic
//while doing const serviceRoute = require("./router/service-router");