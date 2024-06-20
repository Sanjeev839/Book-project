import mongoose from "mongoose";

const url =process.env.MONGODB_URI;

const connection=async()=>{
   try {
    const db =await mongoose.connect(url);
    console.log(db.connection.host);
   } catch (error) {
    console.log(error)
   }
}
export default connection