import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./Search";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const [ log, setLog ] = useState(false)
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
            // Retrieve cart from localStorage
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        });

    const handleNav = () => {
        setNav(!nav)
    }

    const handleLogOut = () =>{
        setLog(!log)
    }

    const display = nav ? 'show': ''
    const logged = log ? 'show-logout': ''

    const handleFilters = (cloth) =>{
        navigate(`/productlist?gender=${cloth}`)
    }
    const handleBestFilters = (cloth) =>{
        navigate(`/productlist?type=${cloth}`)
    }
    
    return ( 
        <nav>
            <div className="desktop-nav">
                <h1>
                    <NavLink to='/'>
                        <img src="/TESMI beta assets/logo.png" alt="" />
                    </NavLink>
                </h1>

                <div className="nav-list">
                    <li><NavLink to='/productlist'>Shop</NavLink></li>
                    <li onClick={()=> handleFilters('women')}>Womens</li>
                    <li onClick={()=> handleFilters('men')}>Mens</li>
                    <li onClick={()=> handleBestFilters('bestseller')}>Best Seller</li>
                    <li>Contact</li> 
                </div>

                <div className="right-sec">
                    <SearchBar />         
                    <li className="user">
                        <i className="fa-solid fa-user"></i>
                        {
                            user ? (
                            <p className="user-log">
                                <span>{user.name}</span>
                                <i onClick={handleLogOut} className="fa-solid fa-caret-down"></i>
                                <span className={`logout ${logged}`} onClick={()=> logout()}>
                                    Logout
                                </span>
                            </p>
                        ) : (<NavLink to='/login'>Login / Register</NavLink>)
                        }
                    </li>
                    <NavLink to='/cart' className='cart-icon'><i className="fa-solid fa-cart-shopping"></i>{cart.length}</NavLink>
                    <div className="ham" onClick={handleNav}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div className={`mobile-nav-list ${display}`}>         
                <li className="user">
                    <i className="fa-solid fa-user"></i>
                    {
                        user ? (
                        <p className="user-log">
                            <span>{user.name}</span>
                            <i onClick={handleLogOut} className="fa-solid fa-caret-down"></i>
                            <span className={`logout ${logged}`} onClick={()=> logout()}>
                                Logout
                            </span>
                        </p>
                    ) : (<NavLink to='/login'>Login / Register</NavLink>)
                    }
                </li>
                <SearchBar />
                <li>Home</li>
                <li>Product</li>
                <li>Pricing</li>
                <li>Contact</li>         
            </div>
        </nav>
    );
}
 
export default Navbar;