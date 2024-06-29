//this folder is for vaidation in which we use zod for the password validation and other things

const {z} = require("zod");

//creating an schema for the sign in
const loginSchema = z.object({
    email: z
    .string({required_error:"Email is required"})
    .trim()
    .email(3, {message:"invalid email address "})
    .min(3, {message:"Email must be atleast of 3 chars. "})
    .max(255,{message:"Email must not have more than 255 chars."}),

    password: z
    .string({required_error:"password is required"})
    .min(7, {message:"password must be atleast of 7 chars. "})
    .max(1024,{message:"password must not have more than 1024 cahrs."}),
})




//creating an object schema for sign up

const signupSchema = loginSchema.extend({//here we extended the login schema so that we dont have to write the email and password again
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3, {message:"name must be atleast of 3 chars. "})
    .max(255,{message:"name must not have more than 255 chars."}),
    
    phone: z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10, {message:"Phone must be atleast of 10 chars. "})
    .max(20,{message:"phone must not have more than 20 chars."}),


});

module.exports = {signupSchema, loginSchema};