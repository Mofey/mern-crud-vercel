import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
    //res.send('Server is ready');

    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: 'All fields are required' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create Product: ", error.message);
        //internal server error
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getProducts = async (req, res) => {
    console.log("Fetching products started");
    
    // Get the page and limit from the query parameters, or set defaults
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 products per page

    try {
        // Calculate the starting index for the documents
        const startIndex = (page - 1) * limit;
        
        // Fetch products with pagination
        const products = await Product.find({})
            .skip(startIndex) // Skip the previous pages' products
            .limit(limit); // Limit the number of products returned

        // Get the total count of products
        const totalProducts = await Product.countDocuments();

        console.log("Fetching products successful");
        res.status(200).json({ 
            success: true, 
            data: products, 
            currentPage: page, 
            totalPages: Math.ceil(totalProducts / limit) 
        });
    } catch (error) {
        console.error("Error fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Product not found" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Product not found" });
    }
    
    //console.log("id: ", id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"})
    } catch (error) {
        console.error("Error in Delete Product: ", error.message);
        //internal server error
        res.status(500).json({ success: false, message: "Server Error" });
    }
}