import express, { Router } from "express";
import {
  addNewBlog,
  deleteBlog,
  fetchListOfBlogs,
  updateBlog,
} from "../controller/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", fetchListOfBlogs);
blogRouter.post("/add", addNewBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);

export default blogRouter; //check for export const blogRouter = express.Router(); will work or not
