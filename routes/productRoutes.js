const express = require('express');
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    resetAllQuantities,
} = require('../controllers/productController');

const router = express.Router();


// get all products
router.get('/', getProducts);

// get one product
router.get('/:id', getProduct);

// POST create a new product
router.post('/', createProduct);

// DELETE a product
router.delete('/:id', deleteProduct);

// UPDATE a product
router.put('/:id', updateProduct);

// update RESET all quantities to zero
router.get('/reset', resetAllQuantities);

module.exports = router;
