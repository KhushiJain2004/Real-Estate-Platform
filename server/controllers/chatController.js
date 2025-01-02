import chatModel from "../models/chatModel.js";
import userModel from "../models/userModels.js";


export const getAllChats=async (req,res)=>
{
    const userId=req.userId;
    try {
        const chats= await chatModel.find({users:{$in:[userId]}});
        const updatedChats=[];
        for (const chat of chats)
        {
            const chatObj=chat.toObject();
            const receiverId = chatObj.users.find(user => user._id.toString() !== userId); 
            const receiver=await userModel.findById(receiverId,'name email avatar');
            const index=chat.users.indexOf(userId);
            chatObj.unreadCount=chat.newMsgCount[index];
            // console.log(receiver);
            chatObj.receiver = receiver;
            updatedChats.push(chatObj);
            // console.log(chat);
        };
        res.json({success:true,updatedChats});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}
export const createChat=async (req,res)=>
{
    const userId=req.userId;
    const {recieverId}=req.body;
    try {
        if(recieverId==null || recieverId==userId) return res.status(404).json({message:"reciever id not provided or invalid"});
        const exists=await chatModel.findOne({users:{$all :[userId,recieverId]}});
        if(exists) return res.status(404).json({success:false,message:"chat already exists"});
        const newChat=await chatModel.create({
            users:[userId,recieverId],
        });
        res.json({success:true,newChat});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}
export const getChat = async (req, res) => {
    const userId = req.userId;
    try {
        const chatId = req.params.chatId;
        const chat = await chatModel.findOne({ _id: chatId }).populate('messages').exec();

        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }

        const index = chat.users.indexOf(userId);

        if (index === -1) {
            return res.status(403).json({ success: false, message: 'User not part of this chat' });
        }

        chat.newMsgCount[index] = 0; 

        if (!chat.seenBy.includes(userId)) {
            chat.seenBy.push(userId);
        }

        const savedChat = await chat.save();

        res.json({ success: true, savedChat });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUser=async (req,res)=>
{
    try {
        res.json({success:true,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get user'});
    }
}