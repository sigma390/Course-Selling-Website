import mongoose from 'mongoose'
import express, { Router } from 'express';
import  { type Request,type Response } from 'express';
const app = express();
const router: Router = express.Router();
import {User} from "../Database/UserSchema"
import { Course } from '../Database/CourseSchema';
import jwt from 'jsonwebtoken';
const SECRET = "omkar23"

import { Authentication } from '../Middleware/middleware';


 //user Signup route
 router.post("/signup",async(req:Request,res:Response)=>{
    const{username,password} = req.body;
    const Usr = await User.findOne({username});
    if (Usr) {
        res.status(403).json({msg:"User already exist"})
    }
    else{
        const newUser = new User({username,password});
       await newUser.save();
       const token = jwt.sign({username ,role:'user' },SECRET,{expiresIn:'1hr'});
       res.json({msg:"User Created successfully",token})

    }
 })
//user login route

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});



 //get info of all courses
 router.get('/courses', Authentication, async (req:Request, res:Response) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
  });

//purchase a CXourse
router.post('/courses/:courseId', Authentication, async (req:any, res) => {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourse.push(course._id);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

  //see purchased courses
  router.get('/purchasedCourses', Authentication, async (req:any, res:Response) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourse');
    if (user) {
      res.json({ purchasedCourse: user.purchasedCourse || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });

  module.exports = router;