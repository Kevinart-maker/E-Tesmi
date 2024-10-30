import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState(() => {
        // Retrieve cart from localStorage
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
    }, [cart]);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedCart = cart.map(item => {
            if (item._id === productId) {
                return { ...item, quantity: Math.max(newQuantity, 1) }; // Ensure at least 1
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    };

    const cartItems = cart.map((item, index) => (
        <div className="cart-card" key={index}>
                <img src={item.images} alt={item.name} />
                <div className="right-sec">
                <NavLink to={`/products/${item._id}`}>
                    <h3>{item.name}</h3>
                </NavLink>
                    <p>{item.category}</p>
                    <p className="size">Size: {item.size}</p>
                    <p className="price">${item.price}</p>
                    <div className="quantity">
                        <label>Quantity: </label>
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                        />
                    </div>
                </div>
            <i className="fa-solid fa-trash" onClick={() => removeFromCart(item._id)}></i>
        </div>
    ));
    
    return (
        <div className="cart">
            <div className="top-sec">
                <h2>Cart</h2>
                <p>Thanks for shopping</p>
            </div>
            <div className="line"></div>
            <div className="cart-hero">
                <div className="left-sec">
                    {cartItems.length > 0 ? cartItems : <p>Your cart is empty</p>}
                </div>
                <div className="right-hero">
                    <h3>Total</h3>
                    <div className="bottom-sec">
                        <div className="subs">
                            <h4>Sub-total</h4>
                            <p><i className="fa-solid fa-naira-sign"></i>{totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="line"></div>
                        <button onClick={() => navigate('/checkout')} disabled={cart.length === 0}>CHECKOUT</button>
                        <div className="pay">
                            <h4>Pay with</h4>
                            <img src="/pay.png" alt="pay with" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;