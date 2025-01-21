import { Splide, SplideSlide } from '@splidejs/react-splide';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import '@splidejs/react-splide/css';



const Home = () => {
    const navigate = useNavigate();
    const [selectedModel, setSelectedModel] = useState(null);


    const handleFilterClick = (cloth) => {
        setSelectedModel(cloth);
        navigate(`/productlist?cloth=${cloth}`);
    };


    return ( 
        <section className="home">
                <div className='third-slide home-container'>
                    <div className="hero-cover">
                        <h3>TESMI</h3>
                        <h1>BESTSELLER COLLECTION</h1>
                        <p>
                            Discover the trendiest tops of the season, <br />
                            click here to elevate your style today.
                        </p>
                        <button onClick={()=> handleFilterClick('bestseller')}>SHOP NOW</button>
                    </div>
    
                    <img src="/hoodie.webp" alt="" />
                </div>
        </section>
    );
}
 
export default Home;