"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = void 0;
const AdminSchema_1 = require("../Database/AdminSchema");
const CourseSchema_1 = require("../Database/CourseSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../Middleware/middleware");
const router = express_1.default.Router();
exports.SECRET = "omkar23";
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
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const newadmin = yield AdminSchema_1.Admin.findOne({ username, password });
    if (newadmin) {
        res.status(403).json({ message: 'Admin already exists' });
    }
    else {
        const obj = {
            username: username,
            password: password
        };
        const newadmin = new AdminSchema_1.Admin(obj);
        newadmin.save();
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, exports.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
}));
//login route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const admin = yield AdminSchema_1.Admin.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ username, role: admin }, exports.SECRET, { expiresIn: '1hr' });
        res.status(200).json({ msg: "Logged in Successfully", token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
//adcourse Route
router.post('/addcourses', middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new CourseSchema_1.Course(req.body);
    yield course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
}));
//update cousre
router.put("/courses/:courseId", middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield CourseSchema_1.Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ msg: "Course Updated Succesfully" });
    }
    else {
        res.status(404).json({ msg: "Course Not found" });
    }
}));
//see Courses
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield CourseSchema_1.Course.find({});
    res.json({ courses });
}));
//see a particular course
router.get("/courses/:courseId", middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseID = req.params.courseId;
    const course = yield CourseSchema_1.Course.findById(courseID);
    if (course) {
        res.json({ course });
    }
    else {
        res.status(404).json({ msg: "Not found" });
    }
}));
module.exports = router;
