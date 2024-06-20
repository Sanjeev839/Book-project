import Books from "../Models/Books.models.js";
import {asyncHandler} from '../Utils/asyncHandler.js'
import {apiError} from '../Utils/apiError.js'
import {apiResponse} from '../Utils/apiResponse.js'
import {uploadOnCloudinary} from '../Utils/Cloudinary.js'

const getBooks =asyncHandler(async(req,res)=>{
      const response =await Books.find();  
      if(!response) throw new apiError(400,"response not found");
      res.status(200).json( new apiResponse(201,response,"All docs"));
})

const createBook =asyncHandler(async(req,res)=>{
    const {name,id,author,price,category} =req.body;
    if(
        [name,id,author,price,category].some((feild)=> feild?.trim()==="")
    ){
        throw new apiError(400,"all feilds are required");
    }
    
    const localPath =req.file?.path;
    console.log(req.file)
    console.log(localPath);
    if(!localPath) throw new apiError(400,"Local path is not defined");

    const imagePath = await uploadOnCloudinary(localPath);
    console.log(imagePath);
    if(!imagePath) throw new apiError(400,"imagePath not found");

    const response =await Books.create({
        name,
        id,
        author,
        price,
        category,
        image:imagePath.url
    })
    if(!response) throw new apiError(400,"book not created");
    res.status(200).json(new apiResponse(201,response,"book created successfully"));
})
export {getBooks,createBook}