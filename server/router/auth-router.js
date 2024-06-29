//this is for all the routes but not the implementation. implementation is int the controller folder

const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const {signupSchema, loginSchema} = require("../validators/auth-validator");  //signup schema made with the help of zod--validator>>auth-validator
const validate = require("../middlewares/validate-middleware"); //middle ware
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);
router.route("/register").post(validate(signupSchema),authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);//! to send user data // and we added a middle ware to it

module.exports = router;