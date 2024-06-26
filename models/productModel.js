const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema defines the structure
const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        aisle: {
            type: String,
            required: true,
        },
        bay: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

// model allows us to interact

module.exports = mongoose.model('Product', productSchema);
