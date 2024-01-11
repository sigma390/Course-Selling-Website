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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const UserSchema_1 = require("../Database/UserSchema");
const CourseSchema_1 = require("../Database/CourseSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "omkar23";
const middleware_1 = require("../Middleware/middleware");
//user Signup route
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const Usr = yield UserSchema_1.User.findOne({ username });
    if (Usr) {
        res.status(403).json({ msg: "User already exist" });
    }
    else {
        const newUser = new UserSchema_1.User({ username, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, SECRET, { expiresIn: '1hr' });
        res.json({ msg: "User Created successfully", token });
    }
}));
//user login route
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield UserSchema_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
//get info of all courses
router.get('/courses', middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield CourseSchema_1.Course.find({ published: true });
    res.json({ courses });
}));
//purchase a CXourse
router.post('/courses/:courseId', middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield CourseSchema_1.Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
        const user = yield UserSchema_1.User.findOne({ username: req.user.username });
        if (user) {
            user.purchasedCourse.push(course._id);
            yield user.save();
            res.json({ message: 'Course purchased successfully' });
        }
        else {
            res.status(403).json({ message: 'User not found' });
        }
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
//see purchased courses
router.get('/purchasedCourses', middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserSchema_1.User.findOne({ username: req.user.username }).populate('purchasedCourse');
    if (user) {
        res.json({ purchasedCourse: user.purchasedCourse || [] });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
}));
module.exports = router;
