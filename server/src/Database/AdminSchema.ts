import mongoose, { ConnectOptions, Mongoose, Schema, Types } from "mongoose";


//admin Schema

interface AdminSchmm{
    username:string;
    password:string
}

const adminSchema:Schema<AdminSchmm> = new Schema({
    username:String,
    password:String
})

const Admin = mongoose.model<AdminSchmm>('Admin',adminSchema)

export {Admin,AdminSchmm};