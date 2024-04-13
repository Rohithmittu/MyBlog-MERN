import express from "express";
import cors from "cors";
import { db } from "./db/db.js";
import blogRouter from "./Route/Blog-route.js";

db();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use("/api", (req, res) => {
  res.send("Hello World");
});

app.listen(4000, () => console.log(`App is running at 4000....`));
