
import mongoose, { ConnectOptions, Mongoose, Schema, Types } from "mongoose";


//user Schema
interface UserSchmm{
    username:string;
    password:string;
    purchasedCourse: Types.ObjectId[] ;
}
const userSchema:Schema<UserSchmm> = new Schema ({
    username:{type:String},
    password:String,
    purchasedCourse:[{type:mongoose.Schema.ObjectId, ref: 'Course'}]

})
const User = mongoose.model<UserSchmm>('User', userSchema);
export { User, UserSchmm };