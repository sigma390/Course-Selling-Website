
import mongoose from 'mongoose'
import express from 'express'

const app = express();
// const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb+srv://root:root@cluster0.pphcshu.mongodb.net/CoursesNeww',{}
 );


 //listener 
 app.listen(3000,()=>{
    console.log("backend started")
 })



