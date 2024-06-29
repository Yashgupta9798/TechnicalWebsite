//this is for all the routes but not the implementation. implementation is int the controller folder

const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact-controller");

router.route("/contact").post(contactForm);


module.exports = router;
