import Home from '../components/Home'
import ShopCards from '../components/ShopCards'
import ProductsCards from '../components/ProductCards'
import Content from '../components/Content'
import Features from '../components/Features'

const Index = () => {
    return (
        <div className="index-page">
            <Home />
            <ShopCards />
            <ProductsCards />
            <Content />
            <Features />
        </div>
    );
}
 
export default Index;