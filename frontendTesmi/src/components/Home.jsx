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
            <Splide
                options={{
                    arrows: false,
                    rewind: true,
                    type : 'loop',
                    gap: '1rem',
                    autoplay : true,
                }}
                aria-label = "My Favorite Images"
                className="slide-container"
            >

                <SplideSlide className="first-slide home-container">
                    <div className="hero-cover">
                        <h3>TESMI</h3>
                        <h1>WOMEN'S COLLECTION</h1>
                        <p>
                            Upgrade your wardrobe with the newest women's fashion <br />
                            click here to shop the latest styles now.
                        </p>
                        <button onClick={()=> handleFilterClick('women')}>SHOP NOW</button>
                    </div>
    
                    <img src="/home.png" alt="" />
                </SplideSlide>
                <SplideSlide className='second-slide home-container'>
                    <div className="hero-cover">
                        <h3>TESMI</h3>
                        <h1>MEN'S COLLECTION</h1>
                        <p>
                            Upgrade your wardrobe with the newest men's fashion <br />
                            click here to shop the latest styles now.
                        </p>
                        <button onClick={()=> handleFilterClick('men')}>SHOP NOW</button>
                    </div>
    
                    <img src="/home2.png" alt="" />
                </SplideSlide>
                <SplideSlide className='third-slide home-container'>
                    <div className="hero-cover">
                        <h3>TESMI</h3>
                        <h1>BESTSELLER COLLECTION</h1>
                        <p>
                            Discover the trendiest tops of the season, <br />
                            click here to elevate your style today.
                        </p>
                        <button onClick={()=> handleFilterClick('bestseller')}>SHOP NOW</button>
                    </div>
    
                    <img src="/hoodie.png" alt="" />
                </SplideSlide>

            </Splide>



        </section>
    );
}
 
export default Home;