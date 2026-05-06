import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Upload each image buffer and get both url + public_id
    const img1 = await uploadOnCloudinary(req.files.image1[0].buffer, "products");
    const img2 = await uploadOnCloudinary(req.files.image2[0].buffer, "products");
    const img3 = await uploadOnCloudinary(req.files.image3[0].buffer, "products");
    const img4 = await uploadOnCloudinary(req.files.image4[0].buffer, "products");

    if (!img1 || !img2 || !img3 || !img4) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    let productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      date: Date.now(),

      // Save both secure_url + public_id in DB
      image1: { url: img1.secure_url, public_id: img1.public_id },
      image2: { url: img2.secure_url, public_id: img2.public_id },
      image3: { url: img3.secure_url, public_id: img3.public_id },
      image4: { url: img4.secure_url, public_id: img4.public_id }
    };

    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (error) {
    console.log("Add Product Error", error);
    return res.status(500).json({
      message: "Add Product Error",
      error
    });
  }
};

export const listProduct = async (req, res) => {
    try {
        let list = await Product.find({});
        if (!list) {
            return res.status(400).json({
                message: "Product List is Empty"
            })
        }

        return res.status(200).json(list);
    } catch (error) {
        console.log("List Product Error", error)
        return res.status(500).json({
            message: "List Product Error",
            error
        })
    }
}


export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Step 2: Delete images safely (check if public_id exists)
    const images = [product.image1, product.image2, product.image3, product.image4];
    for (const img of images) {
      if (img?.public_id) {
        await deleteFromCloudinary(img.public_id, "image");
      }
    }

    // Step 3: Delete product from DB
    await product.deleteOne();

    return res.status(200).json({ success: true, message: "Product and images deleted" });
  } catch (error) {
    console.error("Remove Product Error", error);
    return res.status(500).json({
      success: false,
      message: "Remove Product Error",
      error
    });
  }
};


