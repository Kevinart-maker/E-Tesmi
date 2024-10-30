import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Ratings from "./Ratings";

const ProductDetail = () => {
    const [products, setProducts] = useState([]);
    const [reviewMsgs, setReviewMsgs] = useState('');
    const [selectedSize, setSelectedSize] = useState(''); // State to track selected size
    const [selectedPrice, setSelectedPrice] = useState(null); // State for the selected price
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://backend-tesmi.vercel.app/app/products/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setProducts(data);
                }
            } catch (error) {
                console.error('Failed to fetch products: ', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch(`https://backend-tesmi.vercel.app/ratings/get-reviews/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setReviewMsgs(data);
                }
            } catch (error) {
                console.error('Failed to fetch reviews: ', error);
            }
        };

        fetchProducts();
        fetchReviews();
    }, [id]);

    useEffect(() => {
        // Update the selected price when size is selected
        if (selectedSize && products.price) {
            const priceData = products.price.find(p => p.size === selectedSize);
            setSelectedPrice(priceData ? priceData.amount : null);
        }
    }, [selectedSize, products]);

    const handleAddToCart = () => {
        const cartItem = {
            _id: products._id,
            name: products.name,
            images: products.images[0], // Use the first image
            category: products.category,
            size: selectedSize,
            price: selectedPrice,
            quantity: 1 // Default quantity
        };

        let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const getImageUrl = (imagePath) => {
        return `https://backend-tesmi.vercel.app/static/${imagePath}`;
    };

    return (
        <section className="product-detail-container">
            <section className="product-detail">
                <div className="left-sec">
                    <Splide 
                        options={{ arrows: true, rewind: true, type: 'loop', gap: '1rem', autoplay: true }}
                        aria-label = "My Favorite Images"
                        className="product-slide-container cloth"
                    >
                        {products.images && products.images.map((data, index) => (
                            <SplideSlide key={index}>
                                <img src={getImageUrl(data)} alt={products.name} />
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>

                <div className="right-sec">
                    <div className='cloth-title'>
                    <div className="gender">
                        <span>{products.gender}</span> <span className="type">{products.productType}</span>
                    </div>
                        <h3>{products.name}</h3>
                        <p className="review">{reviewMsgs.length} Reviews</p>
                    </div>

                    <div className="price">
                        <h3>Price: </h3>
                        {selectedPrice ? (
                            <p><i className="fa-solid fa-naira-sign"></i>{selectedPrice}</p>
                        ) : <p>Select a size to view price</p>}
                    </div>

                    <div className="size-selector">
                        <h3>Select Size:</h3>
                        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                            <option value="">Select Size</option>
                            {products.price && products.price.map((p, index) => (
                                <option key={index} value={p.size}>{p.size}</option>
                            ))}
                        </select>
                    </div>
                    <div className="more">
                        <p>Material : <span>{products.material}</span></p>
                        <p>Category : <span>{products.category}</span></p>
                        <p><span>{products.availability}</span> left</p>
                    </div>

                    <div className="cloth-detail">
                        <p>
                            {products.description}
                        </p>
                        <div className="line"></div>
                    </div>
                    <div className="select">
                    <button onClick={handleAddToCart}>
                        <span>Add to cart</span>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
                </div>
            </section>
            <Ratings Products={products} />
        </section>
    );
};

export default ProductDetail;