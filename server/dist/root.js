"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
//requirements
const app = (0, express_1.default)();
const cors = require('cors');
app.use(cors());
app.use(express_1.default.json());
// const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose_1.default.connect('mongodb+srv://root:root@cluster0.pphcshu.mongodb.net/CoursesNeww', {});
//listener 
app.listen(3000, () => {
    console.log("backend started");
});
