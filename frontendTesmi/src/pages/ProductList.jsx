import BreadCrumbs from "../components/BreadCrumbs";
import Filters from "../components/Filters";
import { useLocation, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";


const ProductList = () => {
    const location = useLocation();
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [slice, setSlice] = useState(15)

    const handleSlice = ()=>{
      setSlice(slice + 5)
    }

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('search');
        const cloth = queryParams.get('cloth');
        const gender = queryParams.get('gender');
        const type = queryParams.get('type');
        const bread = queryParams.get('bread');
        console.log(searchQuery)

        const fetchProducts = async () =>{
            try{
                const response = await fetch('https://backend-tesmi.vercel.app/app/products')
                const data = await response.json();
                if(response.ok){
                    setProducts(data)
                    let filtered = data;

                

                    if (searchQuery) {
                        filtered = filtered.filter(products => {
                        const clothName = `${products.name} ${products.category}`;
                        return clothName.toLowerCase().includes(searchQuery.toLowerCase());
                        });
                    }
                    if(cloth){
                        filtered = filtered.filter(products => {
                            return products.category.toLowerCase() || products.gender || products.productType === cloth
                        })
                    }
                    if(type){
                        filtered = filtered.filter(products => {
                            return products.productType === type
                        })
                    }
                    if(gender){
                        filtered = filtered.filter(products => {
                            return products.gender === gender
                        })
                    }
                    if(bread){
                        filtered = filtered.filter(products => {
                            return products.category.toLowerCase() === bread
                        })
                    }

                    setFilteredProducts(filtered)

                }
            
            }catch(error){
                console.error('Failed to fetch products: ', error)
            }
        }

        fetchProducts();

    }, [location.search])
    
    const Products = filteredProducts.slice(0, slice).map((data) => (
        <div className="product-card" key={data._id}>
            <NavLink to={`/products/${data._id}`}>
                <img src='/sweat.png' alt={data.name} />
                <div className="prod-briefs">
                    <h3>{data.name}</h3>
                    <p>{data.category}</p>
                </div>
                <div className="line"></div>
                <p className="price"><span><i className="fa-solid fa-naira-sign"></i>{data.price[0].amount}</span> <content><i className="fa-solid fa-naira-sign"></i>{data.price[0].amount}</content></p>
            </NavLink>
        </div>
    ))
    
    
    return (
        <section className="product-list">
            <BreadCrumbs />
            <div className="product-list-content">
                <Filters results = {Products.length}/>
                <div className="product-list-container">
                    {Products}   
                </div>
                <button onClick={handleSlice}>Load more</button>
            </div>
        </section>
    );
}
 
export default ProductList;