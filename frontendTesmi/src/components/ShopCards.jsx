import card1 from '/media bg-cover.png'
import card2 from '/home2.png'
import card3 from '/unsplash_Bd7gNnWJBkU.jpg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const cardData = [
    {
        title: 'Best Sellers',
        name: 'bestseller',
        image: card3,
        button: 'EXPLORE ITEMS'
    },
    {
        title: 'Women Fit',
        name: 'women',
        image: card1,
        button: 'EXPLORE ITEMS'
    },
    {
        title: 'Men Fit',
        name: 'men',
        image: card2,
        button: 'EXPLORE ITEMS'
    },
]

const ShopCards = () => {

    const navigate = useNavigate();
    const [selectedModel, setSelectedModel] = useState(null);
  
    const handleFilterClick = (cloth) => {
      setSelectedModel(cloth);
      navigate(`/productlist?cloth=${cloth}`);
    };
    
    return (
        <div className="shop-card">
            <div className='shop-card-container'>
                {cardData.map((data, index) =>(
                    <div 
                        className={`
                            card-hero
                            ${
                                        index === 0
                                        ? 'item-one'
                                        : index === 1
                                        ? 'item-two'
                                        : 'item-three'
                            }
                        `}
                        key={data.title}>
                        <img src={data.image} alt="" />
                        <div className="details">
                            <h2>{data.title}</h2>
                            <button onClick={()=> handleFilterClick(data.name)}>{data.button}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default ShopCards;