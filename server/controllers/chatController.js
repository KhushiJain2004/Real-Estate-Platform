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
    const {receiverId}=req.body;
    try {
        if(userId===receiverId) return res.status(502).json({success:false, message:"cannot create chat with yourself"})
        if(receiverId==null || receiverId==userId) return res.status(404).json({message:"receiver id not provided or invalid"});
        const receiver=await userModel.findOne({_id:receiverId})
        const exists=await chatModel.findOne({users:{$all :[userId,receiverId]}});
        if(exists) return res.status(200).json({success:false,message:"chat already exists",chat:exists,receiver});
        const newChat=await chatModel.create({
            users:[userId,receiverId],
        });
        res.json({success:true,chat:newChat,receiver});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}
export const readChat = async (req, res) => {
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

        res.json({ success: true, chat:savedChat });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const findChat=async(req,res)=>
{
    const userId=req.userId;
    try {
        const {receiverId}=req.body;
        const chat=await chatModel.findOne({users:{$all:[userId,receiverId]}});
        if(chat==null) return res.status(404).json({message:"chat does not exist"});

        return res.json({success:true,chatId:chat._id})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUser=async (req,res)=>
{
    try {
        res.json({success:true,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get user'});
    }
}