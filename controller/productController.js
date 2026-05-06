import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
    try {
        let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        let image1 = await uploadOnCloudinary(req.files.image1[0].path)

        let image2 = await uploadOnCloudinary(req.files.image2[0].path)

        let image3 = await uploadOnCloudinary(req.files.image3[0].path)

        let image4 = await uploadOnCloudinary(req.files.image4[0].path)

        let productData = {
            name, 
            description, 
            price:Number(price), 
            category, 
            subCategory, 
            sizes:JSON.parse(sizes), 
            bestseller:bestseller === "true"? true:false,
            date:Date.now(),
            image1,
            image2,
            image3,
            image4
        }

        const product = await Product.create(productData)

        return res.status(201).json(product)
    } catch (error) {
        console.log("Add Product Error",error)
        return res.status(500).json({
            message:"Add Product Error",
            error
        })
    }
}

export const listProduct = async(req, res)=>{
    try {
        let list = await Product.find({});
        if(!list){
            return res.status(400).json({
                message: "Product List is Empty"
            })
        }

        return res.status(200).json(list);
    } catch (error) {
        console.log("List Product Error",error)
        return res.status(500).json({
            message:"List Product Error",
            error
        })
    }
}

export const removeProduct = async(req,res)=>{
    try {
        
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json(product)
    } catch (error) {
        console.log("Remove Product Error",error)
        return res.status(500).json({
            message:"Remove Product Error",
            error
        })
    }
}
