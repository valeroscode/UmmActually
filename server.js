import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import nodemailer from "nodemailer";
mongoose.set("strictQuery", false);
import { postModel, subsModel } from "./model/model.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
const router = express.Router();
app.use("/blog", router);

app.get("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendFile("index.html", { root: __dirname });
});

router.get("/", async (req, res) => {
  try {
    const all = await postModel.find();
    res.json({
      data: all,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findPost = await postModel.findById(id);
    res.json({
      data: findPost,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/getSubs", async (req, res) => {
  try {
    const findSubs = await subsModel.findById(process.env.EMAILS_ID);
    res.json({
      data: findSubs,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/incviews", async (req, res) => {
  const { views, id } = req.body;
  const filter = { _id: id };
  const update = { views: views };
  await postModel.findOneAndUpdate(filter, update, {
    new: true,
  });
  res.json({ views });
});

router.post("/newpost", async (req, res) => {
  const { quote, text, title, category, views, date, image } = req.body;
  const newPost = new postModel({
    quote,
    text,
    title,
    category,
    views,
    date,
    image,
  });
  await newPost.save();
  res.json({ message: "Post added successfully" });
});

router.post("/sub", async (req, res) => {
  try {
    const { email } = req.body;
    const data = await subsModel.findOneAndUpdate(
      { _id: process.env.EMAILS_ID },
      { $push: { emails: email } }
    );
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/newcomment", async (req, res) => {
  try {
    const { name, comment, id } = req.body;
    const data = await postModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          comments: {
            name: name,
            comment: comment,
          },
        },
      }
    );
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    app.listen(PORT, () => console.log("Server started" + PORT));
  } catch (error) {
    console.log(error.message);
  }
};

start();

//Nodemailer code

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.AUTH,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(arr, title) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    bcc: arr, // list of receivers
    subject: `NEW POST - ${title}`, // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>NEW POST - ${title}</h1><br/><a href="http://localhost:5173/" target="_blank">Go to site</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

router.post("/sendMail", async (req, res) => {
  const { subs, title } = req.body;
  main(subs, title);

  res.json({ msg: "sent" });
});
