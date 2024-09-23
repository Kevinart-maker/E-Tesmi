const express = require('express')
const router = express.Router();
const{ ensureAuthenticated } = require('../config/auth');
const Product = require('../models/Product');


router.get("/", (req, res) => {
    res.send("Hello, World!, welcome to app route");
    
})

// // user is logged in
// router.get("/dashboard", ensureAuthenticated, (req, res) => {
//     res.send("Hello, World!, welcome to dashboard route");
    
// })

// display all products
router.get('/products',  async(req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get product by id
router.get('/products/:id', async(req, res) => {
    try{
        const id = req.params.id
        const product = await Product.findById(id);
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({ msg: err.message })
    }
})

// display best sellers
router.get('/best-sellers', async(req, res) => {
    try{
        const bestSellers = await Product.find({ productType:'bestseller' })
        res.status(200).json(bestSellers)
    }catch(error){
        res.status(400).json(error)
    }
})

const fetchProducts = async (gender, category, res) => {
    try {
        const query = { gender };
        if (category) query.category = category;

       
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page -1) * limit;

        const products = await Product.find(query)
        .skip(skip)
        .limit(limit);

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit)

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json({ 
            products,
            currentPage : page,
            totalPages,
            totalProducts
         });

    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Routes
router.get('/men', (req, res) => fetchProducts('men', null, res));
router.get('/men/shirts', (req, res) => fetchProducts('men', 'tops', res));
router.get('/men/trousers', (req, res) => fetchProducts('men', 'trousers', res));
router.get('/men/shorts', (req, res) => fetchProducts('men', 'shorts', res));

router.get('/women', (req, res) => fetchProducts('women', null, res));
router.get('/women/blouse', (req, res) => fetchProducts('women', 'blouse', res));
router.get('/women/shoes', (req, res) => fetchProducts('women', 'shoes', res));

router.get('/kids', (req,res) => fetchProducts('kids', null, res))


// search 
router.get('/search', async (req, res) => {
    try {
        const { searchterm } = req.query;

        if (!searchterm || searchterm.trim().length === 0) {
            return res.status(400).json({ message: 'Search query cannot be empty' });
        }

        const result = await Product.find(
            { $text: { $search: searchterm } },
            { score: { $meta: "textScore" } }  
        ).sort({ score: { $meta: "textScore" } });  

        if (result.length === 0) { 
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(result);
    }
     catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// sorting
router.get('/sort', async(req, res) =>{
    try {
        const {gender, category, size, minPrice, maxPrice, order, sortBy } = req.query;

        const filterCriteria = {};
        if(gender){
            filterCriteria.gender = gender;
        }
        if(category){
            filterCriteria.category = category;
        }
        if(size){
            filterCriteria.sizes = size;
        };

        if(minPrice||maxPrice){
            filterCriteria.price = {};
            if(minPrice){filterCriteria.price.$gte = parseFloat(minPrice)};
            if(maxPrice){filterCriteria.price.$lte = parseFloat(maxPrice)};
        };

       let sortCriteria = {}
       if(sortBy){
        sortCriteria[sortBy] = order === 'desc' ? -1 : 1;
       }
       else{
        sortCriteria = { createdAt: -1 }
       }

       const products = await Product.find(filterCriteria).sort(sortCriteria)

       res.status(200).json(products)



    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



module.exports = router;