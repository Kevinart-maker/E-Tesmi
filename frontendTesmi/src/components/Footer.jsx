import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    
    return (
        <footer>
            <div className="top-sec">
                <div className="get-container">
                    <h2>Get In Touch</h2>
                    <li>contact us via our socials</li>
                    <li className="socials">
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-twitter"></i>
                    </li>
                </div>
                <div className="info-container">
                    <h2>TESMI</h2>
                    <li>About Us</li>
                    <li onClick={()=> navigate('productlist')}>Shop</li>
                    <li>Blog</li>
                </div>
                <div className="features-container">
                    <h2>Features</h2>
                    <li onClick={()=> navigate('contact')}>Contact us</li>
                </div>
            </div>
            <div className="bottom-sec">
                All Rights Reserved.
            </div>
        </footer>
    );
}
 
export default Footer;