import React, { useEffect, useState, useRef } from 'react';
import { fetchBooks } from '../services/bookService';
import '../assets/Styles/GenreFilter.css'
import { useNavigate } from 'react-router-dom';

const GenreFilter = () => {
const [genres, setGenres] = useState([]);
const [selectedGenre, setSelectedGenre] = useState("All Genres");
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

const dropdownRef = useRef(null);

// Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)
  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [])

const handleGenreSelect = (genre) => {
  setSelectedGenre(genre)
  setIsOpen(false);
  window.dispatchEvent(new CustomEvent("genreFilter", { detail: genre }));
  navigate('/')
}
async function getGenres() {
        const data = await fetchBooks();
        let genres = new Set();

    data.forEach(book =>{
      book.subjects?.forEach(subject => {
        if (subject.toLowerCase().includes("fiction")) {
          genres.add("Fiction"); 
        } else {
          subject.split(" -- ").forEach(sub => {
            sub = sub.trim();
            if (!sub.toLowerCase().includes("fiction")) { 
              genres.add(sub); 
            }
          });
        }
      });
    })
        const genresArray = ["All Genres", ...Array.from(genres)]; 
       
        setGenres(genresArray);
      }
      
    useEffect(()=>{
        getGenres();
    },[])
      
      
    return (
        <div className="genre-filter-container" ref={dropdownRef}>
      <button
        className="genre-filter-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          className="filter-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <span className="selected-genre">{selectedGenre}</span>
        <svg
          className={`dropdown-icon ${isOpen ? "open" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="genre-dropdown">
          {genres.map((genre, index) => (
            <button
              key={index}
              className={`genre-option ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => handleGenreSelect(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      )}
    </div>
    );
};

export default GenreFilter;