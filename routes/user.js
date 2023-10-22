import express from "express";
import { User } from "../models/user.js";
import { logout,login,getAllUsers,register,getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.get("/users/all",getAllUsers);
//to get details from user id

router.post("/users/new",register);//cookies and status code added 

//router.get("/userid/:id",special);

router.post("/users/login",login);
router.get("/users/me",isAuthenticated,getMyProfile);
//is authenticated important so req
//router.put("users/userid/:id",updateUser);

//router.delete("users/userid/:id",deleteUser);
router.get("/users/logout",logout);
export default router;