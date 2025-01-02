import mongoose from "mongoose";

const schema=mongoose.Schema(
    {
        senderId:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
        text:{type:String,required:true},
        chatId:{type:mongoose.Schema.Types.ObjectId,ref:'chats'},
        createdAt:{type:Date,default:Date.now()},
        // seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
    }
)

const messageModel=mongoose.model("message",schema);
export default messageModel;