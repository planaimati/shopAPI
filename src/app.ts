import express from "express";

const app = express();

const start = () => {
  app.listen(8080, () => {
    console.log("app is working on 8080 port");
  });
};

start();
