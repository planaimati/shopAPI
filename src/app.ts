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

const app = express();
config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

app.get("/", (req, res) => {
  res.send("Hello from shop API");
});

const port = 8000;
const start = async () => {
  console.log(process.env.MONGO_URI);

  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(process.env.PORT || port, () => {
      console.log(`server is working...`);
    });
  } catch (error) {
    console.log(error);
    console.log("xd");
  }
};

start();
