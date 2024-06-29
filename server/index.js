require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const serviceRoute = require("./router/service-router");
const adminRouter = require("./router/admin-router");// for the admin route

//middle ware
app.use(express.json())  //to handle the json data //inbuilt middleware
//for tackling the cors policy
const corsOption ={
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOption)); //let's tackel cors //also a middleware



app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data", serviceRoute);

app.use("/api/admin", adminRouter);//let's define admin route

app.use(errorMiddleware); //to check the error from the error-middleware>> it must be checked before the connection is made

const PORT = 5000;
connectDb().then(()=>{
    //listen such that the route can be used
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    });
})