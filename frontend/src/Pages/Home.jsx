import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/Blog-Context";
import axios from "axios";
import "./Home.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("http://localhost:4000/api/blogs");
    const result = await response.data;

    // console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    const response = await axios.delete(
      `http://localhost:4000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;

    // console.log(result)

    if (result?.message) {
      fetchListOfBlogs();
      // navigate(0)
    }
  }

  function handleEdit(getCurrentBlogItem) {
    // console.log(getCurrentBlogItem);
    navigate("/add-blog", { state: { getCurrentBlogItem } });
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className="wrapper">
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs ! Please wait</h1>
      ) : (
        <div className="blogList">
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit onClick={() => handleEdit(blogItem)} size={30} />
                <FaTrash
                  onClick={() => handleDeleteBlog(blogItem._id)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <h3>No Blogs Added</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
