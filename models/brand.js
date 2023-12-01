import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    year: {
      type: Number,
    },
  },
  {
    timeStamps: true,
  },
);

const brandModel = mongoose.model("Brand", brandSchema);
export default brandModel;
