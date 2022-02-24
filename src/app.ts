import express from "express";
import { connectDB } from "./db/connect";
import { config } from "dotenv";
import { router } from "./routes/users";
import bodyParser from "body-parser";
import sesseion from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportInitialize from "./passportConfig";
import aws from "aws-sdk";

const app = express();
config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  sesseion({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
passportInitialize(passport);

app.use("/api/v1", router);

const port = 8080;
const url =
  "mongodb+srv://Mati:1234@cluster0.t1pfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const start = async () => {
  try {
    await connectDB(url);
    app.listen(process.env.PORT || port, () => {
      console.log(`server is working...`);
    });
  } catch (error) {
    console.log(error);
    console.log("xd");
  }
};

start();
