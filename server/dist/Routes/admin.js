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
const AdminSchema_1 = require("../Database/AdminSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const SECRET = "omkar23";
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
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
}));
module.exports = router;
