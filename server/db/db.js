import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const db = () => mongoose.connect("mongodb://localhost:27017/todo-app")
.then(() => {
  console.log("Connected to Database");
})
.catch((error) => {
  console.error("Error connecting to Database:", error);
});



