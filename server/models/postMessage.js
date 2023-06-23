import mongoose from 'mongoose';


const postSchema=mongoose.Schema({
    title: String,
    message: String,
    name:String,
    creator:String,
    selectedFile: String,
    tags:[String],
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }

})

const postMessage = mongoose.model('postMessage', postSchema);
export default postMessage;
