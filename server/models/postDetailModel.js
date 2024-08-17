import mongoose from "mongoose";
import postModel from "./userModels.js";

const postDetailSchema =new mongoose.Schema(
    {
        desc:{type:String,required:true},
        utilities:String,
        pet:String,
        income:String,
        size:Number,
        school :Number,
        bus:Number,
        retraunt:Number,
        
    }
)
// postId:{ type:mongoose.Schema.Types.ObjectId,ref:'posts',unique:true}

const postDetailModel= mongoose.model("postDetail",postDetailSchema);

export default postDetailModel;   