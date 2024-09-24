const express = require('express')
const router = express.Router();
const Order = require('../models/Order')
const{ ensureAuthenticated } = require('../config/auth');
const axios = require('axios')

//place order
router.post('/place-order', async (req, res) => {
    try {
        const { userId, items, shippingCost, shippingAddress } = req.body;
        
        let subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);  
        let totalAmount = subtotal + (shippingCost || 5000);

        const newOrder = new Order({
            userId: userId || null,  // null for guest checkout
            items,
            subtotal,
            shippingCost: shippingCost || 5000,  // Default to 5000 if shippingCost is not provided
            totalAmount,
            paymentReference: 'Pending',  // This will be updated after payment is confirmed
            paymentStatus: 'Pending',
            shippingAddress
        });

        const savedOrder = await newOrder.save();
        res.status(200).json({ orderId: savedOrder._id, message: 'Order created', order: savedOrder });
    
    } catch (error) {
        res.status(500).json({ err: error.message, message: 'Error creating order' });
    }
});


router.post('/pay', async(req, res) =>{
    try{
       const {email, totalAmount, orderId} = req.body;

       const API_KEY = process.env.API_KEY;
       const API_URL = process.env.API_URL;

       const requestData = {
        email : email,
        amount : totalAmount *100
       }

       const response = await axios.post(`${API_URL}/transaction/initialize`, requestData, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
       });

       const paymentReference = response.data.data.reference;
       const paymentStatus = response.data.data.status;

       await Order.findByIdAndUpdate(orderId, { paymentReference, paymentStatus });

       res.status(200).json({
        message : "Payment initialized",
        paymentReference: paymentReference,
        paymentUrl : response.data.data.authorization_url,
        access_code: response.data.data.access_code
       })

            
    } 
    catch (error) {
        res.status(500).json({ message: error.response ? error.response.data.message : error.message });            
    }
})


// previously ordered


module.exports = router;