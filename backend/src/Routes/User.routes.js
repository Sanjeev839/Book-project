import { Router } from "express";
import { signUp,Login } from "../Controllers/User.Controllers.js";
const userRouter =Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(Login);

export default userRouter