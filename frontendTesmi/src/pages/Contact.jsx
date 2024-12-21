const Contact = () => {
    
    return (
        <div className="contact">
            <div className="contact-head">
                <h1>Contact Us</h1>
                <p>Any question or remarks? Just write us a message!</p>
            </div>
            <div className="contact-body">
                <div className="contact-left">
                    <h2>Contact Information</h2>
                    <div className="contact-add">
                        <li>
                            <i className="fa-solid fa-phone"></i>
                            <span>+2345678901234</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-envelope"></i>
                            <span>loremipsum@gmail.com</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>
                                98B, doe street, Lagos.
                            </span>
                        </li>
                    </div>
                    <div className="socials">
                        <a href="#"><i className="fa-brands fa-facebook"></i></a>
                        
                        <a href="https://www.instagram.com/niveksti_"><i className="fa-brands fa-instagram"></i></a>

                        <a href="https://x.com/odeyemikevin"><i className="fa-brands fa-twitter"></i></a>

                        <a href="#"><i className="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>


                <div className="contact-right">
                    <form>
                        
                        <div className="contact-in">
                            <input
                                id="firstname"
                                type='text' 
                                name="firstname"
                                placeholder='First Name'
                            />
                            <input
                                id="lastname"
                                type="text" 
                                name="lastname"
                                placeholder='Last Name'
                            />
                            <input
                                id="email"
                                type="email" 
                                name="email"
                                placeholder='Email'
                            />
                            <input
                                id="phone"
                                type="number" 
                                name="phone"
                                placeholder='Phone Number'
                            />
                        </div>
                        <textarea
                            id="message"
                            name="message"
                            placeholder='Write your message'
                        />
                        <button type="submit">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Contact;