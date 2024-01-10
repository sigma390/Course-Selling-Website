import mongoose, { Document, Schema } from 'mongoose';
//interface for type safty
interface ICourse {
    title: string;
    description: string;
    price: number;
    imageLink: string;
    published: boolean;
}

interface ICourseDocument extends ICourse, Document {} //generic Document

const courseSchema: Schema<ICourseDocument> = new Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
});

const Course = mongoose.model<ICourseDocument>('Course', courseSchema);

export { Course, ICourse };