import express from "express";
import cors from 'cors'
import connection from "./Database/db.js";
import bookRouter from "./Routes/Book.routes.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/User.routes.js";
import routes from "./Routes/Contact.routes.js";
const app =express();
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({limit:"16kb"}));
app.use(express.static("public"))
app.use(express.urlencoded({limit:"16kb",
extended:true}))
const port =process.env.PORT  || 8000;

app.use("/api/v1/books",bookRouter);
app.use("/api/v1/users",userRouter);
app.use('/api', routes);
connection().then(()=>{
    app.listen(port,()=>{
        console.log(`listening on port ${port}`);
    })
})
 