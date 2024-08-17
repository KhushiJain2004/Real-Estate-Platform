import mongoose from "mongoose";
import userModel from "./userModels.js";

const schema = mongoose.Schema(
    {
        tittle:String,
        name:String,
        price:Number,
        images:[String],
        address:String,
        city:String,
        bedroom:Number,
        bathroom:Number,
        latitude:String,
        longitude:String,
        type:
        {
            type:String,
            enum:['buy','rent']
        },
        property:
        {
            type:String,
            enum:['apartment','house','condo','land']
        },
        createdAt:{ type:Date,default:Date.now()},
        authorId:{ type:mongoose.Schema.Types.ObjectId,ref:'users'},
        postDetail:{ type: mongoose.Schema.Types.ObjectId, ref: 'postDetail' },
    }
)

const postModel= mongoose.model("posts",schema);

export default postModel;   