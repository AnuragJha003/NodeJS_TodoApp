import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {connectDB} from "./data/database.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app=express();//exporting it 

config({
    path:"./data/config.env",
});
//connectDB();
const router=express.Router();


//using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
})
);
//using routes 
app.use(userRouter);
app.use(taskRouter);

/*mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"backendapi",
})
.then(()=> console.log("DB CONNECTED"))
.catch((e)=> console.log(e));
*/


/*const schema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

const User=mongoose.model("User",schema);*/


app.get("/",(req,res)=>{
    res.send("Nice working");
});

/*app.get("/users/all",async (req,res)=>{

    const users= await User.find({})

    console.log(req.query);

    res.json({
        success:true,
        users,
    });
});*/
//to get details from user id 

//making it dynamic using id suppose
//can see in postman u r getting the details of all the id by sending a get request to the dynamic url 
/*app.get("/userid/:id",async (req,res)=>{
    //const {id}=req.body;
    const {id}=req.params;
    const user=await User.findById(id);

    res.json({
        success:true,
        user,
    });
});*/



/*app.post("/users/new",async (req,res)=>{

    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });

    res.status(201).cookie("tempi","lol").json({//201 means created successfully
        success:true,
        message:"Registered succesfully",
    });
});//cookies and status code added  */
/*app.listen(4000,()=>{
    console.log("Server is working");
});*/