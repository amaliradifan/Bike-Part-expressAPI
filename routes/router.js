/* eslint-disable import/extensions */
import express from "express";
import {
  getAllBikeParts, getBikePartsById, addBikePart, deleteBikePart, updateBikePart,
} from "../controllers/bikePartController.js";
import { getBikePartsByCategory } from "../controllers/categoryController.js";
import { getBikePartsByBrand } from "../controllers/brandController.js";

const router = express.Router();

router.get("/bikeParts", getAllBikeParts);
router.get("/bikeParts/category/:category", getBikePartsByCategory);
router.get("/bikeParts/brand/:brand", getBikePartsByBrand);
router.get("/bikeParts/:id", getBikePartsById);

router.post("/bikeParts", addBikePart);

router.put("/bikeParts/:id", updateBikePart);

router.delete("/bikeParts/:id", deleteBikePart);

export default router;
