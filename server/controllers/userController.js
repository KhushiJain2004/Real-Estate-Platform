import userModel from "../models/userModels.js";
import postModel from "../models/postModel.js";
import bcrypt from 'bcrypt';

export const getUser=async (req,res)=>
{
    const id=req.params.userId;
    try {
        const user = await userModel.findOne({id});
        res.json({success:true,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get user'});
    }
}
export const getUserPost=async (req,res)=>
    {
        const id=req.userId;
        // console.log(id);
        try {
            const user=await userModel.findOne({id});
            const posts = await postModel.find({authorId:id})
            .populate('postDetail')
            .populate('authorId', 'name avatar email')
            .exec();
            res.json({success:true,user,posts});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'failed to get userPosts'});
        }
    }
export const updateUser=async (req,res)=>
{
    const id=req.params.id;
    const userId=req.userId;
    const {password,avatar,...data}=req.body;

    if(userId!==id)
    {
        return res.status(403).json({message:"Not authorised"});
    }
    let newPassword=null;
    try {
        if(password)
        {
            newPassword=bcrypt.hash(password,10);
        }
        const updated  = await userModel.findOneAndUpdate({_id:id},{
            ...data,
            ...(newPassword && {password:newPassword}),
            ...(avatar && {avatar})
        },
        { new: true }
    );
        // console.log(updated);
        const plainUser = updated.toObject();
        const { password: userPassword, ...userInfo } = plainUser;
        // console.log(userInfo);
        res.json(userInfo);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get user'});
    }
}

export const deleteUser=async (req,res)=>
{
    const id=req.params.id;
    const userId=req.userId;
    if(userId!==id)
    {
        return res.status(403).json({message:"Not authorised"});
    }
    try {
        const user=await userModel.findByIDAndDelete(id);
        if(userId!==id)
        {
            return res.status(403).json({message:"Not authorised"});
        }
        res.status(200).json({message:"deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get user'});
    }
}