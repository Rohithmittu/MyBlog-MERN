

import mongoose from "mongoose"
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : String,
    description : String,
    date : {
        type : Date,
        default: Date.now
    }
})


// export const Blog = mongoose.model("Blog",blogSchema)
export default mongoose.model("Blog", blogSchema);
