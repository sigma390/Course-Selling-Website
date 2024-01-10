import mongoose from 'mongoose'
import express from 'express'


//requirements
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
// const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb+srv://root:root@cluster0.pphcshu.mongodb.net/CoursesNeww',{}
 );


 //listener 
 app.listen(3000,()=>{
    console.log("backend started")
 })



