import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Filters = (props) => {
    const navigate = useNavigate();
    const [selectedModel, setSelectedModel] = useState('women');
    
    const handleChange = (e) => {
        console.log('model value: ', e.target.value)
        setSelectedModel(e.target.value);
      };

    const handleFilterClick = (cloth) => {
        setSelectedModel(cloth);
        navigate(`/productlist?gender=${cloth}`);
    };
    
    return (
        <section className="filters">
            <h3>Showing all {props.results} results</h3>

            <div className="filter">
                <select value={selectedModel} onChange={handleChange}>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="children">Kids</option>
                </select>
                <button onClick={()=> handleFilterClick(selectedModel)}>Filter</button>
            </div>
        </section>
    );
}
 
export default Filters;