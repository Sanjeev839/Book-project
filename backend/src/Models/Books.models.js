import mongoose, {Schema} from "mongoose";

const bookSchema =new Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
},{timestamps:true});

const Books = mongoose.model("Books",bookSchema);
export default Books;