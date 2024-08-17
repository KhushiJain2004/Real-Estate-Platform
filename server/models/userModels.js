import mongoose from "mongoose";

const schema=mongoose.Schema(
    {
        name:{type: String,required:true},
        email:{type:String,unique:true,required:true},
        password:{type:String,required:true},
        avatar :{type:String},
        createdAt:{type:Date , default:Date.now()},
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }]
    }
);

const userModel=mongoose.model('users',schema);

export default userModel;