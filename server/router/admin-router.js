const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");


router.route("/users").get(adminController.getAllUsers );
router.route("/contacts").get(adminController.getAllContacts );

module.exports = router; //! very very import don't forget