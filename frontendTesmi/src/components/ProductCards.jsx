import productsData from "../data/productsData";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

const ProductsCards = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{

        const fetchProducts = async () =>{
            try{
                const response = await fetch('https://backend-tesmi.vercel.app/app/products')
                const data = await response.json();
                if(response.ok){
                    setProducts(data)
                }
            }catch(error){
                console.error('Failed to fetch products: ', error)
            }
        }

        fetchProducts();

    }, [])

    const Products = products.slice(0,10).map((data) => (
        <div className="product-card" key={data._id}>
            <NavLink to={`/products/${data._id}`}>
                <img src={data.images[0]} alt={data.name} />
                <div className="prod-briefs">
                    <h3>{data.name}</h3>
                    <p>{data.category}</p>
                </div>
                <div className="line"></div>
                <p className="price"><span>${data.price[0].amount}</span> <content>${data.price[0].amount}</content></p>
            </NavLink>
        </div>
    ))
    
    return (
        <div className="products">
            <div className="headings">
                <h1>RECENTLY ADDED</h1>
            </div>
            <div className="product-card-container">
                {Products}       
            </div>
            <button className="">
                <NavLink to='/productlist'>
                    <span>LOAD MORE</span>
                    <div></div>
                </NavLink>
            </button>
        </div>
    );
}
 
export default ProductsCards;