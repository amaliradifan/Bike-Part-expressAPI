/* eslint-disable import/extensions */
import configModel from "../models/index.js";

const { Brand, Category } = configModel.models;

export const getCategoryIdByName = async (categoryName) => Category.findOneAndUpdate(
  { name: categoryName },
  { new: true },
);

export const getBrandIdByName = async (brandName) => Brand.findOneAndUpdate(
  { name: brandName },
  { new: true },
);
