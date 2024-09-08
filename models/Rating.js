const mongoose = require('mongoose')
const User = require('./User')
const Product = require('./Product')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: Product,
        required: true 
    },
    rating: {
        type: Number,
        required: true
    },
    review:{
        type:String,
        required: true
    }

}, 
{timestamps:true});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;