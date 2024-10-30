import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'


const BreadCrumbs = () => {
    const navigate = useNavigate();
    const [selectedModel, setSelectedModel] = useState(null);

    const breadData = [
        {
            img: '/bread1.png',
            title: 'SHIRTS',
            name: 'shirts',
            content: '5 Items'
        },
        {
            img: '/bread2.png',
            title: 'TOPS',
            name: 'tops',
            content: '5 Items'
        },
        {
            img: '/bread3.png',
            title: 'TROUSERS',
            name: 'trousers',
            content: '5 Items'
        },
        {
            img: '/bread4.png',
            title: 'SHORTS',
            name: 'shorts',
            content: '5 Items'
        },
        {
            img: '/bread5.png',
            title: 'SHOES',
            name: 'shoes',
            content: '5 Items'
        },
    ]
    
    const handleFilterClick = (cloth) => {
        setSelectedModel(cloth);
        navigate(`/productlist?bread=${cloth}`);
    };

    const breadItems = breadData.map((data) => (
        <div className="bread-card" onClick={()=> handleFilterClick(data.name)}>
            <img src={data.img} alt={data.name} />
            <div className="bread-content">
                <h3>{data.title}</h3>
            </div>
        </div>
    ))

    
    return (
        <section className="bread-crumbs">
            <div className="top-sec">
                <h2>Shop</h2>
                <div className="breadcrumbs">
                    <NavLink to='/'>Home</NavLink>
                    <i className="fa-solid fa-angle-right"></i>
                    <NavLink to='/productlist'>Shop</NavLink>
                </div>
            </div>
            <div className="bottom-sec">
                {breadItems}
            </div>
        </section>
    );
}
 
export default BreadCrumbs;