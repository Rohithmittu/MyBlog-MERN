import mongoose from "mongoose";
import Blog from "../model/Blog.js";

const fetchListOfBlogs = async (req, res) => {
  let blogList;

  try {
    blogList = await Blog.find();
    if (!blogList) {
      return res.status(404).json({ message: "NO BLogs Found" });
    }

    return res.status(200).json({ blogList });
  } catch (error) {
    console.log(error);
  }
  //   if (!blogList) {
  //     return res.status(404).json({ message: "NO BLogs Found" });
  //   }

  //   return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currenDate = new Date();

  const newlyCreatedBlog = new Blog({
    title,
    description,
    date: currenDate,
  });

  try {
    await newlyCreatedBlog.save();
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save(session);
    session.commitTransaction();

    // so this is done to stop unnessary request to api
    // and comit all changes at once
  } catch (error) {
    return res.send(500).json({ message: e });
  }

  return res.status(200).json({ newlyCreatedBlog });
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);

    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Unable t0 delete ! Please try again" });
  }
};

const updateBlog = async (req, res) => {
  const id = req.params.id;

  const { title, description } = req.body;

  let curentBlogToUpdate;

  try {
    curentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Something went wrong while updating ! Please wait" });
  }

  if (!curentBlogToUpdate) {
    res.status(500).json({ message: "Unable to update" });
  }

  return res.status(200).json({ curentBlogToUpdate }); // upodate blog has some error fic it
};

export { fetchListOfBlogs, updateBlog, deleteBlog, addNewBlog };
