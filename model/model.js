import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

const subsSchema = new mongoose.Schema({
  emails: [
    {
      type: String,
    },
  ],
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  quote: { type: String, required: true },
  text: { type: String, required: true },
  views: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  comments: [
    {
      name: { type: String },
      comment: { type: String },
    },
  ],
});

export const postModel = mongoose.model("posts", postSchema);
export const userModel = mongoose.model("users", userSchema);
export const subsModel = mongoose.model("subs", subsSchema);
