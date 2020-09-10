import { Document } from "mongoose";

export interface ProductDocument extends Document {
  sku: string;
  name: string;
  alias: string;
  description: string;
  category: string;
  cover: string;
  brand: string;
  photos: [string];
  status: boolean;
  quantity: number;
  price: number;
  retailPrice: number;
  weight: number;
  massUnit: string;
  length: number;
  width: number;
  height: number;
  distanceUnit: string;
  color: string;
}
