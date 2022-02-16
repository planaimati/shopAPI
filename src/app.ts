import express from "express";
import { connectDB } from "./db/connect";
import { config } from "dotenv";
import { router } from "./routes/users";
import bodyParser from "body-parser";
import sesseion from 'express-session'
import cors from 'cors';
import cookieParser from 'cookie-parser'


const app = express();
config();
app.use(bodyParser.json());
app.use("/api/v1", router);
app.use(cors({
  origin: "http://localhost:3000/",
  credentials: true
}))
app.use(sesseion({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser("secretcode"))

const port = 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () => {
      console.log(`server is working on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
