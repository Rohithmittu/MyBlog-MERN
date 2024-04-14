import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/Blog-Context";
import "./add-blog.css";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

const AddNewBlog = () => {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(formData);

  async function handleSaveToDatabase() {
    const response = isEdit
      ? await axios.put(
          `http://localhost:4000/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:4000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });

    const result = await response.data;

    // console.log(result);

    if (result) {
      setIsEdit(false)
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  useEffect(() => {
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, [location]);

  return (
    <div className="wrapper">
      <h1>{isEdit ? "Edit a Blog" : "Add a Blog"}</h1>
      <div className="form-wrapper">
        <input
          type="text"
          name="titlr"
          placeholder="Enter Blog Title"
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData, // see if it works without this at last
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
        <button onClick={handleSaveToDatabase}>
          {isEdit ? "Edit Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddNewBlog;
