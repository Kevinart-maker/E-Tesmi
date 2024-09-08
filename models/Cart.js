const mongoose = require('mongoose');
const Product = require('./Product')
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, 
        ref: 'User', required: false 
    },
    item: [{
            productId: { 
                type: Schema.Types.ObjectId, 
                ref: Product,
                required: true 
            },
            name: {
                type: String,
                required: true 
            },
            quantity: {
                type: Number, 
                required: true 
            },
            size: { 
                type: String, 
                required: true 
            },  
            amount: { 
                type: Number, 
                required: true 
            }, 
        }],
    
},
{timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
