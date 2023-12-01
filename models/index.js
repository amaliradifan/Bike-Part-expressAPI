/* eslint-disable import/extensions */
import mongoose from "mongoose";
import dbConfig from "../config/dbConfig.js";
import bikePartModel from "./bikePart.js";
import brandModel from "./brand.js";
import categoryModel from "./category.js";

const configModel = {
  mongoose,
  url: dbConfig.url,
  models: {
    BikePart: bikePartModel,
    Brand: brandModel,
    Category: categoryModel,
  },
};

export default configModel;
