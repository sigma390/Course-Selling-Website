import mongoose from "mongoose";
import { Express } from "express";
import { Admin} from '../Database/AdminSchema';
import { Course } from '../Database/CourseSchema';
import jwt from 'jsonwebtoken';
import express, { Router } from 'express';
import  { type Request,type Response } from 'express';
import { Authentication} from "../Middleware/middleware"
const router: Router = express.Router();
interface CustomRequest extends Request {
    user?: any; // Adjust the type according to your actual user object type
}

export const SECRET = "omkar23"

// router.get("/me",async (req: CustomRequest,res:Response)=>{
//     const admin = await Admin.findOne({username:req.user.username});
//     if (!admin) {
//         res.status(403).json({msg:"Admin Doesnt Exist"})
//         return;
//     }
//     res.json({
//         username: admin.username
//     })
// });


router.post("/signup",async (req:Request, res:Response)=>{
    const {username,password} = req.body;
    const newadmin = await Admin.findOne({ username, password });
    if (newadmin) {
        res.status(403).json({ message: 'Admin already exists' });
    } else {
      const obj = {
        username:username,
        password:password
      }
      const newadmin = new Admin(obj);
      newadmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }
  });

//login route

router.post("/login",async(req:Request,res:Response)=>{
    const {username,password} = req.body;
    const admin = await Admin.findOne({username,password});
    if (admin) {
        const token = jwt.sign({username,role:admin},SECRET,{expiresIn:'1hr'})
        res.status(200).json({msg:"Logged in Successfully", token})
    }
    else{
        res.status(403).json({ message: 'Invalid username or password' });
    }
}
)
 
//adcourse Route

router.post('/addcourses', Authentication, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
  });

  //update cousre
  router.put("/courses/:courseId", Authentication,async (req:CustomRequest,res:Response)=>{
    const course = await Course.findByIdAndUpdate(req.params.courseId , req.body , {new:true});
    if (course) {
      res.json({msg:"Course Updated Succesfully"})
    }
    else{
      res.status(404).json({msg:"Course Not found"});
    }
  })
//see Courses
router.get("/courses",async(req:CustomRequest,res:Response)=>{
  const courses = await Course.find({});
  res.json({courses});
})

module.exports = router;

//see a particular course
router.get("/courses/:courseId",Authentication,async(req:CustomRequest,res:Response)=>{
  const courseID = req.params.courseId;
  const course = await Course.findById(courseID);
  if (course) {
    res.json({course});
  }
  else{
    res.status(404).json({msg:"Not found"});
  }

})