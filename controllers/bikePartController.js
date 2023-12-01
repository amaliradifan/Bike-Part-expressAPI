/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import configModel from "../models/index.js";
import { getBrandIdByName, getCategoryIdByName } from "./helper.js";
import { applyPriceFilter, getSortDirection } from "./filter.js";

const { BikePart } = configModel.models;

export const getAllBikeParts = async (req, resp) => {
  try {
    const {
      minPrice, maxPrice, price,
    } = req.query;
    let query = {};

    applyPriceFilter(query, minPrice, maxPrice);
    const sortDirection = getSortDirection(price);

    const bikeParts = await BikePart.find(query)
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

export const getBikePartsById = async (req, resp) => {
  try {
    const bikePart = await BikePart.findById(req.params.id).populate("brand", "name").populate("category", "name");
    if (!bikePart) resp.status(404).json({ message: "Bike Part Not Found" });
    return resp.status(200).json({
      message: "success",
      data: bikePart,
    });
  } catch (err) {
    return resp.status(500).json({ message: err.message });
  }
};

export const addBikePart = async (req, resp) => {
  try {
    const category = await getCategoryIdByName(req.body.category);
    const brand = await getBrandIdByName(req.body.brand);

    if (!category || !brand) {
      return resp.status(400).json({ message: "Invalid Category or brand" });
    }

    req.body.category = category._id;
    req.body.brand = brand._id;
    const newBikePart = new BikePart(req.body);
    await newBikePart.save();
    const allBikeParts = await BikePart.find().populate("brand", "name").populate("category", "name");
    return resp.status(200).json({
      message: "success",
      newBikePart,
      data: allBikeParts,
    });
  } catch (err) {
    return resp.status(500).json({ message: err.message });
  }
};

export const updateBikePart = async (req, resp) => {
  try {
    const bikePart = await BikePart.findById(req.params.id);
    const data = req.body;

    const categoryId = await getCategoryIdByName(data.category);
    const brandId = await getBrandIdByName(data.brand);
    if (!categoryId || !brandId) {
      return resp.status(400).json({ message: "Invalid Category or brand" });
    }

    if (bikePart) {
      bikePart.name = data.name;
      bikePart.description = data.description;
      bikePart.price = data.price;
      bikePart.brand = brandId;
      bikePart.category = categoryId;
      const updatedBikePart = await bikePart.save();
      return resp.status(200).json({
        message: "successfully Update Bike Part",
        beforeUpdate: bikePart,
        updatedBikePart,
      });
    }
    return resp.status(404).json({ message: "Bike Part Not Found" });
  } catch (err) {
    return resp.status(500).json({ message: err.message });
  }
};

export const deleteBikePart = async (req, resp) => {
  try {
    const bikePart = await BikePart.findById(req.params.id);
    if (bikePart) {
      await BikePart.findByIdAndDelete(req.params.id);
      const bikeParts = await BikePart.find().populate("brand", "name").populate("category", "name");
      return resp.status(200).json({
        message: "Successfully Delete Bike Part",
        deletedBikePart: bikePart,
        bikeParts,
      });
    }
    return resp.status(404).json({ message: "Bike Part Not Found" });
  } catch (err) {
    return resp.status(500).json({ message: err.message });
  }
};
