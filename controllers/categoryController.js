/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import configModel from "../models/index.js";
import { getCategoryIdByName } from "./helper.js";
import { applyPriceFilter, getSortDirection } from "./filter.js";

const { BikePart } = configModel.models;

export const getBikePartsByCategory = async (req, resp) => {
  try {
    const { category } = req.params;
    const {
      minPrice, maxPrice, price,
    } = req.query;
    const query = {};

    applyPriceFilter(query, minPrice, maxPrice);
    const sortDirection = getSortDirection(price);

    const categoryId = await getCategoryIdByName(category);
    if (!categoryId) {
      return resp.status(404).json({ message: "Category Not Found" });
    }

    const bikeParts = await BikePart.find({ category: categoryId })
      .sort(sortDirection ? { price: sortDirection } : null)
      .populate("brand", "name")
      .populate("category", "name");

    return resp.status(200).json({
      message: "success",
      data: bikeParts,
    });
  } catch (err) {
    return resp.status(500).json({ message: err.message });
  }
};
