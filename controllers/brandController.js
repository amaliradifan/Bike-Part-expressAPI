/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import configModel from "../models/index.js";
import { getBrandIdByName } from "./helper.js";
import { applyPriceFilter, getSortDirection } from "./filter.js";

const { BikePart } = configModel.models;

export const getBikePartsByBrand = async (req, resp) => {
  try {
    const { brand } = req.params;
    const {
      minPrice, maxPrice, price,
    } = req.query;
    const query = {};

    applyPriceFilter(query, minPrice, maxPrice);
    const sortDirection = getSortDirection(price);

    const brandId = await getBrandIdByName(brand);
    if (!brandId) {
      return resp.status(404).json({ message: "Brand Not Found" });
    }

    const bikeParts = await BikePart.find({ brand: brandId })
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
