"use strict";
//requirements
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const mongoose_1 = __importDefault(require("mongoose"));
const adminRouter = require("./Routes/admin");
const userRouter = require("./Routes/user");
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
// const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.connect('mongodb+srv://root:root@cluster0.pphcshu.mongodb.net/CoursesNeww', options);
//listener 
app.listen(3000, () => {
    console.log("backend started");
});
