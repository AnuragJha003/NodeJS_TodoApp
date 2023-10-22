import { Task } from "../models/task.js";


export const newTask=async (req,res,next)=>{
    const {title,description}=req.body;
    //see models.js.task wala part 
    await Task.create({
       title,description,
       user:req.user, 
    });
    res.status(201).json({
        success:true,
        message:"Task added",
    });//now this route completed 
};

export const getMyTask=async(req,res,next)=>{
    const userid=req.user._id;//user id

    const tasks=await Task.find({user:userid});

    res.status(200).json({
        success:true,
        tasks,
    });
};
export const updateTask=async(req,res,next)=>{
   const {id}=req.params;
    const task=await Task.findById(id);
    if(!task)return res.status(404).json({
        success:false,
        message:"Invalide"
    });

    task.isCompleted=!task.isCompleted;
    await task.save();
    res.status(200).json({
        success:true,
        message:"Task Updated",
    });
};
export const deleteTask=async(req,res,next)=>{
    const {id}=req.params;
    const task=await Task.findById(id);

    if(!task)return res.status(404).json({
        success:false,
        message:"Invalide"
    });
    await task.deleteOne();//new method for removal in newer versions 

    res.status(200).json({
        success:true,
        message:"Task Deleted",
    });
};