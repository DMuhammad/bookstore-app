import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRouter from "./routes/booksRoute.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(res);
  return res.status(234).send("Welcome to MERN Stack tutorial");
});

app.use("/books", bookRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
