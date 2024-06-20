import { Router } from "express";
import { getBooks ,createBook} from "../Controllers/Books.Controllers.js";
const bookRouter =Router();
import {upload} from "../Middlewares/multer.middlewares.js"
bookRouter.route("/").get(getBooks).post(upload.single("image"),createBook);

export default bookRouter