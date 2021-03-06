import Express, { Router } from "express";
import BodyParser from "body-parser";
import Cors from "cors";
import mongoose from "mongoose";
import shiftRoute from "./Routes/shift.js";

mongoose.connect("mongodb://localhost:27017/shift", {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const app = Express();
const port = process.env.PORT | 5100;

app.use(Cors());
app.use(BodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(shiftRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
