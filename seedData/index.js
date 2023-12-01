/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import mongoose from "mongoose";
import dbConfig from "../config/dbConfig.js";
import configModel from "../models/index.js";
import brandsData from "./brands.js";
import categoriesData from "./categories.js";
import bikePartsData from "./bikePartsData.js";

const { BikePart, Brand, Category } = configModel.models;

mongoose.connect(dbConfig.url);

const seedMainData = async () => {
  try {
    await Category.deleteMany();
    await Brand.deleteMany();
    await BikePart.deleteMany();

    const savedCategories = await Category.insertMany(categoriesData);
    const savedBrands = await Brand.insertMany(brandsData);

    const brandNameToId = {};
    savedBrands.forEach((brand) => {
      brandNameToId[brand.name] = brand._id;
    });

    const categoryNameToId = {};
    savedCategories.forEach((category) => {
      categoryNameToId[category.name] = category._id;
    });

    bikePartsData.forEach((bikePart) => {
      bikePart.brand = brandNameToId[bikePart.brand];
      bikePart.category = categoryNameToId[bikePart.category];
    });

    await BikePart.insertMany(bikePartsData);

    console.log("Seeding data  berhasil!");
  } catch (error) {
    console.error("Seeding data gagal:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedMainData();
