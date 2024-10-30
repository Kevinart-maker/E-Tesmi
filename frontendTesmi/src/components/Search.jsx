import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/productlist?search=${searchTerm}`);
    } else {
      navigate('/productlist');
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim() !== '') {
        navigate(`/productlist?search=${searchTerm}`);
      } else {
        navigate('/productlist');
      }
    }
  }

  return (
    <form className="search-input">
      <input
        type="search"
        placeholder="Search for vehicles"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
        <i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
    </form>
  );
};

export default SearchBar;