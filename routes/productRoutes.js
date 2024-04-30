const express = require('express');
const {
    resetAllQuantities,
    getProducts,
    getProduct,
    getNeeded,
    createProduct,
    deleteProduct,
    updateProduct,
} = require('../controllers/productController');

const router = express.Router();

// update RESET all quantities to zero
router.get('/reset', resetAllQuantities);

// get all products
router.get('/', getProducts);

// get only needed products
router.get('/needed', getNeeded)

// get one product
router.get('/:id', getProduct);

// POST create a new product
router.post('/', createProduct);

// DELETE a product
router.delete('/:id', deleteProduct);

// UPDATE a product
router.put('/:id', updateProduct);


module.exports = router;
