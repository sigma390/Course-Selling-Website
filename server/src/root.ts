


//requirements

import express from 'express'
const cors = require('cors');
import jwt from 'jsonwebtoken'
import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const adminRouter = require("./Routes/admin")
const userRouter = require("./Routes/user")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/admin",adminRouter);
app.use("/user",userRouter);



// const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb+srv://root:root@cluster0.pphcshu.mongodb.net/CoursesNeww',options
 );


 //listener 
 app.listen(3000,()=>{
    console.log("backend started")
 })



