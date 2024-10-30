const Footer = () => {
    return (
        <footer>
            <div className="top-sec">
                <div className="get-container">
                    <h2>Get In Touch</h2>
                    <li>the quick fox jumps over the <br /> lazy dog</li>
                    <li className="socials">
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-twitter"></i>
                    </li>
                </div>
                <div className="info-container">
                    <h2>Company Info</h2>
                    <li>About Us</li>
                    <li>Carrier</li>
                    <li>We are hiring</li>
                    <li>Blog</li>
                </div>
                <div className="features-container">
                    <h2>Features</h2>
                    <li>Business Marketing</li>
                    <li>User Analytic</li>
                    <li>Live Chat</li>
                    <li>Unlimited Support</li>
                </div>
            </div>
            <div className="bottom-sec">
                All Rights Reserved.
            </div>
        </footer>
    );
}
 
export default Footer;