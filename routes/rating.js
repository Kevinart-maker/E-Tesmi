const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const User = require('../models/User')
const{ ensureAuthenticated } = require('../config/auth');


// add rating to product
router.post('/add-review/:productId',  async (req, res) => {
    try {
        const { review, rating, userId } = req.body; 
        const { productId } = req.params; 

        // Validation
        if (!rating) {
            return res.status(400).json({ message: 'Rating is required' });
        }
        if (!review) {
            return res.status(400).json({ message: 'Review is required' });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingRating  = await Rating.findOne({ userId, productId });
        if (existingRating) {
             res.status(400).json({ message : "You have rated this product already" }) 
            }

        // Create new Rating
        const newRating = new Rating({
            userId,
            productId,
            review,
            rating
        });

        // Save to the database
        await newRating.save();
        res.status(200).json(newRating);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// update rating
router.put('/update-review/:productId/:ratingId',  async (req, res) => {
    try {
        const { review, rating} = req.body; 
        const userId = req.user._id
        const { productId, ratingId } = req.params; 

        const existingReview = await Rating.findById(ratingId)
        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        else {

            updatedReview = await Rating.findByIdAndUpdate( ratingId,
                {
                userId: userId,
                productId: productId,
                _id: ratingId,
                review: review,
                rating: rating
            },
        {new:true});
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

            res.status(200).json(updatedReview);
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// delete rating
router.delete('/delete-review/:ratingId',  async (req, res) => {
    try {
        const{ ratingId } = req.params;
        const deletedReview = await Rating.findByIdAndDelete(ratingId);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(deletedReview);

    } catch (error) {
        res.status(500).send({ message: error.message })

    }
})


// get reviews for a product
router.get('/get-reviews/:productId', async (req, res) => {
    try {
        
        const { productId } = req.params;
        const reviews = await Rating.find({productId: productId}).populate('userId').populate('productId');
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found" });
        }
        res.status(200).json(reviews);

    } catch (error) {
        res.status(500).send({ message: error.message })

    }
})


module.exports = router