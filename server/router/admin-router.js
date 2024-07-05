const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware")
const adminMiddleware = require("../middlewares/admin-middleware");


router.route("/users").get(authMiddleware,adminMiddleware, adminController.getAllUsers );
router.route("/users/:id").get(authMiddleware,adminMiddleware, adminController.getUserById );// single user for the edit function(means only getting the data which exists)
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,adminController.updateUserById); // after we click the edit button then we get the data using upper path but if we need to update it we can do it with this path
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);//to delete a perticular user if admin wants
router.route("/contacts").get(authMiddleware, adminMiddleware,adminController.getAllContacts );
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware,adminController.deleteContactById );

module.exports = router; //! very very import don't forget