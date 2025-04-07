import React, { useState } from 'react';
import { Search, Heart, BookOpen, ChevronDown, Filter } from "lucide-react"
import '../assets/Styles/SearchBar.css'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate= useNavigate();
 const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    window.dispatchEvent(new CustomEvent("bookSearch", { detail: searchTerm }));
    navigate('/')
  }
  return (
    <div className="search-bar-container">
    <div className="search-icon">
      <Search />
    </div>
    <input
      type="search"
      className="search-input"
      placeholder="Search by Title . . ."
      onChange={handleSearch}
    />
  </div>
  


  );
};

export default SearchBar;