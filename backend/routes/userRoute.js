import express from 'express';
import {loginUser, registerUser, adminLogin, getDetails, updateUser, updatePassword, forgotPassword, resetPassword} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get("/getUser", getDetails);
userRouter.put('/updateUser',updateUser)
userRouter.put('/updatePassword',updatePassword)
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter