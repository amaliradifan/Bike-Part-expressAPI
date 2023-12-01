/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
// eslint-disable-next-line import/extensions
import dbConfig from "./config/dbConfig.js";
import router from "./routes/router.js";

const app = express();

app.use(express.json());
app.use(router);

mongoose.set("strictQuery", false);
mongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
