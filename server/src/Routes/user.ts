import mongoose from 'mongoose'
import express from 'express'

const app = express();


mongoose.connect('mongodb+srv://root:root@cluster0.pphcshu.mongodb.net/CourseSNew',{}
 );

 app.listen(3000,()=>console.log("Started"))