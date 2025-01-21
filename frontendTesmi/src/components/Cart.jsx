import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, updateCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
    }, [cartItems]);

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        updateCart(updatedCart);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedCart = cartItems.map(item => {
            if (item._id === productId) {
                return { ...item, quantity: Math.max(newQuantity, 1) };
            }
            return item;
        });
        updateCart(updatedCart);
    };

    const renderCartItems = cartItems.map((item, index) => (
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
                    <select 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                    >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <i className="fa-solid fa-trash" onClick={() => removeFromCart(item._id)}></i>
        </div>
    ));
    
    return (
        <div className="cart">
            <div className="top-sec">
                <h2>
                    <span>Cart</span> 
                    <i className="fa-solid fa-chevron-right"></i> 
                    <NavLink to='/productlist'>Shop</NavLink>
                </h2>
                <p>Thanks for shopping</p>
            </div>
            <div className="line"></div>
            <div className="cart-hero">
                <div className="left-sec">
                    {cartItems.length > 0 ? renderCartItems : <p>Your cart is empty</p>}
                </div>
                <div className="right-hero">
                    <h3>Total</h3>
                    <div className="bottom-sec">
                        <div className="subs">
                            <h4>Sub-total</h4>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="line"></div>
                        <button onClick={() => navigate('/checkout')} disabled={cartItems.length === 0}>CHECKOUT</button>
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