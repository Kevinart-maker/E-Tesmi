const mongoose = require('mongoose');
const Product = require('./Product');
const User = require('./User')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: User, required: false }, // Guest checkout
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: Product, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            total: { type: Number, required: true }
        }
    ],
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true, default: 5000 },
    totalAmount: { type: Number, required: true },
    paymentReference: { type: String, required: true }, // Paystack reference
    paymentStatus: { type: String, required: true, default: 'Pending' }, // Updated after payment
    orderStatus: { type: String, required: true, default: 'Pending' },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        mobileNo: { type: String, required: true },
        country: { type: String, required: true },
        email: { type: String, required: true }
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
