import jwt from 'jsonwebtoken'

export const verifyToken= (req,res,next)=>
{
    // if( !req.cookies.token) {
    //     // localStorage.setItem("user",null);
    //     return res.json({message:'token expired'})
    // }
    const token=req.cookies.token;
    // if(!token) return res.status( 401).json({message:"not authenticated"});
    
    jwt.verify(token,process.env.SECRET_KEY,async(err,payload)=>
    {
        // if (err.name === 'TokenExpiredError') {
        //     return res.status(401).json({ message: 'Token expired' });
        // }
        if(err) return res.json({message:"Token not valid"});
        req.userId=payload.id;
        next();
    })
}