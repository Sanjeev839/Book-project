import Users from "../Models/User.models.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { apiError } from "../Utils/apiError.js";
import { apiResponse } from "../Utils/apiResponse.js";
import  bcrypt from 'bcryptjs'
export const signUp =asyncHandler(async(req,res)=>{
    const {email,name,password} =req.body;
    const user =await Users.findOne({email});
    if(user) throw new apiError(400,"User already Exist");
    const hashedPasword =await bcrypt.hash(password,10);
    const response =await Users.create({
        name,
        email,
        password:hashedPasword
    })
    if(!response) throw new apiError(400,"user does not create successfully");
    res.status(200).json(new apiResponse(201,response,"User Created Successfully"));
})

export const Login =asyncHandler(async(req,res)=>{
    const {email,password} =req.body;
    if(!email || !password) throw new apiError(400,"email or password should be filled");
    const user =await Users.findOne({email});
    if(!user) throw new apiError(400,"User does not Exist");
    const checkPassword =await bcrypt.compare(password,user.password);
    if(!checkPassword) throw new apiError(400,"Invalid Credentials");
    res.status(200).json(new apiResponse(201,user,"User LoggedIn Successfully"));
})