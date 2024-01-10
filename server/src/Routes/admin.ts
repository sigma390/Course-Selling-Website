import mongoose from "mongoose";
import { Express } from "express";
import { Admin} from '../Database/AdminSchema';
import { Course } from '../Database/CourseSchema';
import jwt from 'jsonwebtoken';
import express, { Router } from 'express';
import  { type Request,type Response } from 'express';
const router: Router = express.Router();
interface CustomRequest extends Request {
    user?: any; // Adjust the type according to your actual user object type
}

const SECRET = "omkar23"

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

module.exports = router;