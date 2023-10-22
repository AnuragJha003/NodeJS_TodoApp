import jwt from "jsonwebtoken";

export const sendcookies = (user,res,message,statusCode=200) => {
    const token =jwt.sign({_id:user._id},process.env.JWT_SECRET); 
res.status(statusCode).cookie("token",token,{
    httpOnly:true,
    maxAge:15*60*1000,
    //these 2 props work for deployment so cant be tested on PostMan
    //so process .node env added to check for it 
    sameSite:process.env.NODE_ENV === "Development"?"lax":"none",
    secure:process.env.NODE_ENV === "Development" ? false:true,
}).json({
    success:true,
    message,
});
};