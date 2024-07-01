const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware")
const adminMiddleware = require("../middlewares/admin-middleware");


router.route("/users").get(authMiddleware,adminMiddleware, adminController.getAllUsers );
router.route("/users/:id").get(authMiddleware,adminMiddleware, adminController.getUserById );// single user for the edit function
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,adminController.updateUserById)
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);//to delete a perticular user if admin wants
router.route("/contacts").get(authMiddleware, adminMiddleware,adminController.getAllContacts );

module.exports = router; //! very very import don't forget