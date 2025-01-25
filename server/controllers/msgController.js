import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";

export const sendMsg=async(req,res)=>
{
    const senderId=req.userId;
    const chatId=req.params.chatId;
    const {text}=req.body;
    try {
        const chat=await chatModel.findOne({_id:chatId});
        // console.log(chat);
        if(!chat) return res.json({success:false,message:'chat not found'});
        const newMsg=await messageModel.create({
            senderId,
            text,
            chatId
        })
        const savedMsg=await newMsg.save();

        chat.messages.push(savedMsg);
        chat.lastMessage=text;
        const index=chat.users.indexOf(senderId);
        const recieverIndex=index==0 ? 1 :0;
        chat.newMsgCount[index]=0;
        chat.newMsgCount[recieverIndex]+=1;
        chat.seenBy=[senderId];

        const savedChat=await chat.save();
        // console.log(chat);

        res.json({success:true,msg:savedMsg});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
    }
}
