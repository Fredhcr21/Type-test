import { url } from 'inspector';
import { Schema, model } from 'mongoose';
import { createDeflate } from 'zlib';

const PostSchema = new Schema({
    title: { type: String, required: true},
    url: {type: String, required: true, unique: true, lowercase: true}, 
    content: { type: String, required: true},
    Image: String,
    createdAt: { type: Date, default: Date.now},
    uodatedAt: Date
})

export default model('Post' ,PostSchema);