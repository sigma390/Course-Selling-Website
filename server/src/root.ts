


//requirements

import express from 'express'

import jwt from 'jsonwebtoken'
import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const adminRouter = require("./Routes/admin")


const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use("/admin",adminRouter);







app.use(cors());
app.use(express.json());
app.use("/admin",adminRouter);



// const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb+srv://root:root@cluster0.pphcshu.mongodb.net/CoursesNeww',{}
 );


 //listener 
 app.listen(3000,()=>{
    console.log("backend started")
 })



