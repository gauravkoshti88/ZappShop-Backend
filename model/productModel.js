import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },

  image1: {
    url: { type: String, required: true },    
    public_id: { type: String, required: true } 
  },
  image2: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  image3: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  image4: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },

  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  date: { type: Number, required: true },
  bestseller: { type: Boolean, required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
