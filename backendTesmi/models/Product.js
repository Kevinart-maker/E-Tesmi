const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: [{
        size: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    gender: {
        type: String,
        enum: ['men', 'women', 'children'],
        required: true
    },
    
    category: {
        type: String,
        required: true
    },
    sizes: {
        type: [String], 
        required: true
    },
    images: {
        type: [String], 
        required: true
    },
    availability: {
        type: Number,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    productType:{
        type: String,
        required: true
    },
    SKU: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }

    
});

productSchema.index({ name: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
