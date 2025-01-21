import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";


import BreadCrumbs from "../components/BreadCrumbs";
import ProductsCards from "../components/ProductCards";
import ProductDetail from "../components/ProductDetail";
import Ratings from "../components/Ratings";
import Cart from "../components/Cart";

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(()=>{

        const fetchProducts = async () =>{
            try{
                const response = await fetch('https://backendtesmi.onrender.com/app/products')
                const data = await response.json();
                if(response.ok){
                    setProducts(data)
                    console.log(data)
                }
            }catch(error){
                console.error('Failed to fetch products: ', error)
            }
        }

        fetchProducts();

    }, [])
    
    return (
        <section className="product">
            {
             //<BreadCrumbs />
            }
            <ProductDetail />
            <ProductsCards />
        </section>
    );
}
 
export default Products;