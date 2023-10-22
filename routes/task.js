import express from "express";
import { updateTask,deleteTask,newTask,getMyTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router .post("/task/new",isAuthenticated,newTask);
//isauth added so that this is for the users who are already logged in 

router .get("/task/my",isAuthenticated,getMyTask);
//get the task 

router.route("/task/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;