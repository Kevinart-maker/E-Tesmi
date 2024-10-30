const express = require('express')
const router = express.Router();
const Cart = require('../models/Cart')
const{ ensureAuthenticated } = require('../config/auth');


// Add to cart
router.post('/',  async (req, res) => {
    const { userId, product} = req.body;

    try {
        
        let cart = await Cart.findOne({ userId});

        if (cart) {
           const existingItemIndex = cart.item.findIndex(item => item.productId.toString() === product.productId)

           if(existingItemIndex > -1){
            cart.item[existingItemIndex].quantity += product.quantity
           }
           else{
            cart.item.push(product)
           }

           await cart.save();
           res.status(200).json(cart)

        } 
        else {
            const newItem = new Cart({
                userId,
                item:[product]
            });
            await newItem.save();  
            
            res.status(200).json(newItem);
        }
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while adding the item to the cart" });
    }
});


// remove from cart
router.delete('/:cartId/:productId', async(req, res) => {
    try {
       const { cartId, productId } = req.params

        const cart = await Cart.findById(cartId)
        if(cart){
            const itemIndex = cart.item.findIndex(item => item.productId.toString() === productId)
            if(itemIndex > -1){
                if(cart.item[itemIndex].quantity > 1){
                    cart.item[itemIndex].quantity -= 1;
                }
                else{
                    cart.item.splice(itemIndex, 1)

                }
                await cart.save()
                res.status(200).json(cart)
            }
            else{
                res.status(404).json({message: "Item not found in cart"})
            }
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router;