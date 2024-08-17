import postModel from "../models/postModel.js";
import postDetailModel from "../models/postDetailModel.js";
import userModel from "../models/userModels.js";

export const getAllPosts=async (req,res)=>
{
    const { city, minPrice, maxPrice,type} = req.query;
    // console.log(city,minPrice,maxPrice,type);

    let query = {};

    if (city) {
      query.city = city;
    }
  
    if (type) {
      query.type = type;
    }
  
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseInt(minPrice);
      }
      if (parseInt(maxPrice)>0) {
        query.price.$lte = parseInt(maxPrice);
      }
    }
  
    try {
      const posts = await postModel.find(query);
      res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed" });
  }
}

export const getPost=async (req,res)=>
{
    const id=req.params.id;
    try {
        const post=await postModel.findById(id)
        .populate('postDetail')
        .populate('authorId', 'name avatar email')
        .exec();
        res.status(200).json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed"});
    }
}
export const addPost=async (req,res)=>
{
    const {postData,postDetail}=req.body;
    const tokenUserId=req.userId;

    try {
        console.log('User ID:', tokenUserId);
        const detail= await postDetailModel.create(
        {
            ...postDetail
        }
        )
        const newPost= await postModel.create(
        {
            ...postData,
            authorId:tokenUserId,
            postDetail:detail._id
        }
        );
        res.status(200).json(newPost);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Failed"});
    }
}
export const updatePost= async(req,res)=>
{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed"});
    }
}
export const deletePost= async(req,res)=>
{
    const id=req.params.id;
    const tokenUserId=req.userId;

    try {
        const post=await postModel.findById(id);
        if(post.authorId!=tokenUserId) return res.json({message:"Not authorised"});
        await postModel.deleteOne({_id:post._id});
        res.json({message:"deleted"});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed"});
    }
}

export const savePost=async(req,res)=>
{
    const userId=req.userId;
    const postId=req.params.postId;
    console.log(userId);
    console.log(postId);
    try {
        const post=await postModel.findById(postId);
        const user=await userModel.findById(userId);
        if(!user.posts.includes(postId))
        {
            user.posts.push(postId);
            const updated=await user.save();
            if(updated)
            {
                res.json(updated);
            }
            else throw new Error(error.message);
        }
    } catch (error) {
        console.log(error.message)
        return res.json(error.message);
    }
}