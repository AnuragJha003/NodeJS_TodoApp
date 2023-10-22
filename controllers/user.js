import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendcookies } from "../utils/features.js";

export const getAllUsers=async (req,res)=>{

    const users= await User.find({})

    console.log(req.query);

    res.json({
        success:true,
        users,
    });
};

export const register=async (req,res)=>{

    const {name,email,password}=req.body;
    /*await User.create({
        name,
        email,
        password,
    });

    res.status(201).cookie("tempi","lol").json({//201 means created successfully
        success:true,
        message:"Registered succesfully",
    });*/
    let user=await User.findOne({email});
    if(user)
    return res.status(404).json({
success:false,
message:"User already exists",
});
const hashedPassword=await bcrypt.hash(password,10);

user=await User.create({name, email, password:hashedPassword});

sendcookies(user,res,"Registered Successsfully",201);
};

/*export const special=async (req,res)=>{
    //const {id}=req.body;
    const {id}=req.params;
    const user=await User.findById(id);

    res.json({
        success:true,
        user,
    });
};*/
/*export const updateUser=async (req,res)=>{
    //const {id}=req.body;
    const {id}=req.params;
    const user=await User.findById(id);

    res.json({
        success:true,
        message:"Updated",
    });
};*/
/*export const deleteUser=async (req,res)=>{
    //const {id}=req.body;
    const {id}=req.params;
    const user=await User.findById(id);

    await user.remove();
    res.json({
        success:true,
        message:"Deleted",
    });
};*/
export const getMyProfile=(req,res)=>{
    /*const {id}=req.params;
    const user=await User.findById(id);

    res.json({
        success:true,
        user,
    });*/
    //const id=;
    //using cookieparser to get the id 
    /*const {token}=req.cookies;
    console.log(token);
    if(!token)
    return res.status(404).json({
        success:false,
        message:"Login first",
        });
    const decoded=jwt.verify(token,process.env.JWT_SECRET);*/
    //const user=await User.findById(decoded._id);    
    res.status(200).json({
        success:true,
        user:req.user,
    });
};
export const login=async(req,res,next)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email}).select("+password");
    //all accessible ones + the password domains 

    if(!user)
    return res.status(404).json({
success:false,
message:"Invalid Cred",
});
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch)
  return res.status(404).json({
success:false,
message:"Invalid Cred",
});

sendcookies(user,res,`Welcome back,${user.name}`,200);
//dynamically
};

export const logout=(req,res)=>{
    res.status(200)
    .cookie("token","",
    { expires:new Date(Date.now()),
        httpOnly:true,
        maxAge:15*60*1000,
        //these 2 props work for deployment so cant be tested on PostMan
        //so process .node env added to check for it 
        sameSite:process.env.NODE_ENV === "Development"?"lax":"none",
        secure:process.env.NODE_ENV === "Development" ? false:true,})
    .json({
        success:true,
        user:req.user,
    });
};