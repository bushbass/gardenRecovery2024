const Product = require('../models/productModel');
const mongoose = require('mongoose');


// set all products quatity to 0
const resetAllQuantities = async (req, res) => {
    const result = await Product.updateMany(
        { quantity: { $gt: 0 } },
        { quantity: 0 }
    );
    res.send(result);
};

// get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ aisle: 1, bay: 1 });
    res.status(200).json(products);
};

// get only needed products
const getNeeded = async (req, res) => {
    const products = await Product.find({ quantity: { $gt: 0 } }).sort(({ bay: 1 }))
    res.status(200).json(products)
}

// get a single product
const getProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such product' });
    }

    const product = await Product.findById(id);
    if (!product) {
        return res.status(400).json({ error: 'no such product' });
    }
    res.status(200).json(product);
};

// create a new product
const createProduct = async (req, res) => {
    const { title, category, quantity, aisle, bay, sku } = req.body;

    const emptyFields = [];
    if (!title) {
        emptyFields.push('title');
    }
    if (!category) {
        emptyFields.push('category');
    }
    if (!quantity) {
        emptyFields.push('quantity');
    }
    if (!aisle) {
        emptyFields.push('aisle');
    }
    if (!bay) {
        emptyFields.push('bay');
    }
    if (!sku) {
        emptyFields.push('sku');
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: 'please fill in all fields', emptyFields });
    }
    // add document to DB
    try {
        const product = await Product.create({
            title,
            category,
            quantity,
            aisle,
            bay,
            sku,
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a product

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such product' });
    }

    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
        return res.status(400).json({ error: 'no such product' });
    }

    res.status(200).json(product);
};

// update a product

const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such product' });
    }

    const product = await Product.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    );

    if (!product) {
        return res.status(400).json({ error: 'no such product' });
    }
    res.status(200).json(product);
};


module.exports = {
    resetAllQuantities,
    getProducts,
    getProduct,
    getNeeded,
    createProduct,
    deleteProduct,
    updateProduct,
};
