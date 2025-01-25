import mongoose from 'mongoose';

//a single conversation between two users
 //the users that are part of the chat 
//message in the chat 
//last message
const chatSchema=mongoose.Schema(
    {
        users:[{type:mongoose.Schema.Types.ObjectId,ref:'users'}],
        lastMessage: { type: String, default: null },
        createdAt: { type: Date, default: Date.now },
        newMsgCount:[{ type: Number, default: [0, 0] }],
        seenBy:[{type:mongoose.Schema.Types.ObjectId,ref:'users'}],  // lastMsg seen by 
        messages:[{type:mongoose.Schema.Types.ObjectId,ref:'message'}],
        lastUpdated:{type:Date, default:Date.now}
    },
    { timestamps: true }
)

const chatModel=mongoose.model("chats",chatSchema);

export default chatModel;