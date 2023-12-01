import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timeStamps: true,
  },
);

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
