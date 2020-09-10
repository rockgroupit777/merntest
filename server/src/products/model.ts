import { Schema, model, Types } from "mongoose";
import { ProductDocument } from "./";

const productDocument = new Schema(
  {
    sku: {
      type: String,
      validate: [
        async (sku: string): Promise<boolean> =>
          !(await Product.exists({ sku })),
        "the sku already exist",
      ],
      required: [true, "The sku must be required"],
    },
    name: {
      type: String,
      validate: [
        async (name: string): Promise<boolean> =>
          !(await Product.exists({ name })),
        "the name already exist",
      ],
      required: [true, "The name must be required"],
    },
    alias: {
      type: String,
      validate: [
        async (alias: string): Promise<boolean> =>
          !(await Product.exists({ alias })),
        "the alias already exist",
      ],
      required: [true, "The alias must be required"],
    },
    description: {
      type: String,
      validate: [
        async (description: string): Promise<boolean> =>
          !(await Product.exists({ description })),
        "the description already exist",
      ],
      required: [true, "The description must be required"],
    },
    category: {
      type: String,
    },
    cover: {
      type: String,
      validate: [
        async (cover: string): Promise<boolean> =>
          !(await Product.exists({ cover })),
        "the cover already exist",
      ],
      required: [true, "The cover must be required"],
    },
    brand: {
      type: String,
    },
    photos: [{ type: String }],
    quantity: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    retailPrice: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    massUnit: {
      type: String,
    },
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    distanceUnit: {
      type: String,
    },
    color: [{ type: String }],
  },
  {
    timestamps: true,
  }
);
const Product = model<ProductDocument>("Product", productDocument);
export default Product;
