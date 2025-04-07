import React from 'react';
import SearchBar from './SearchBar';
import { Heart } from "lucide-react"
import '../assets/Styles/Navbar.css'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import GenreFilter from './GenreFilter';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="navbar">
             <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center  my-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 mb-4 ">
          Discover Literary Worlds
        </h1>
        <p className="text-gray-300 text-xl max-w-2xl mx-auto">
          Explore our curated collection of timeless classics and contemporary masterpieces
        </p>
      </motion.div>
        <div className="search-container">
            <SearchBar />
            <GenreFilter/>
            <button className="wish-list-btn" onClick={()=>navigate('wish-list')}>
             <Heart className="wishlist-title-icon" />
            WishList
        </button>
        </div>
      
    </div>
    
    );
};

export default Navbar;