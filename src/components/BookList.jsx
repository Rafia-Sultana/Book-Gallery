import React, { useState, useEffect, useCallback } from "react";
import { fetchBooks } from "../services/bookService";
import "../assets/Styles/BookList.css"; 
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import BookCard from "./BookCard";

const BookList = () => {
    const [books, setBooks] = useState([]); 
    const [filteredBooks, setFilteredBooks] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8;
    const navigate = useNavigate();

    const loadBooks = async () => {
        try {
            setLoading(true);
            const data = await fetchBooks();
           
            const extractBooks = data.map(({ id, authors, title, formats, subjects }) => ({
                id,
                authorName: authors[0]?.name || "Unknown Author",
                title,
                coverImage: formats["image/jpeg"] || "https://via.placeholder.com/150",
                genre: subjects || [],
            }));

            setBooks(extractBooks);
            setFilteredBooks(extractBooks); 
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = useCallback( (e) => {
      
        const searchTerm = e.detail;
        let filtered = books;
        if(searchTerm){
          filtered = books.filter(book => book.title.toLowerCase().includes(searchTerm));
        }
       
        setFilteredBooks(filtered);
        setCurrentPage(1);
    },[books]) 

    const handleGenreFilter = useCallback( (e) =>{
        const selectedGenre = e.detail.toLowerCase().trim();
       if(selectedGenre){
        setFilteredBooks(
            books.filter(book=>
                book.genre.some(g=>g.toLowerCase().includes(selectedGenre))));
       }
       else{
        setFilteredBooks(books);
       }
       setCurrentPage(1)
    },[books])

    useEffect(() => {
        loadBooks();
    }, []);

    useEffect(() => {
        window.addEventListener("bookSearch", handleSearch);
        window.addEventListener("genreFilter", handleGenreFilter);
        return () => {
            window.removeEventListener("bookSearch", handleSearch);
            window.removeEventListener("genreFilter", handleGenreFilter);
        };
    }, [handleSearch,handleGenreFilter]); 
  
    const toggleWishList = (bookId, isAdding) => {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      
        if (isAdding) {
          wishlist.push(bookId);
        } else {
          wishlist = wishlist.filter((id) => id !== bookId);
        }
      
        localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Store updated wishlist
      };
      



 const indexOfLastBook = currentPage * booksPerPage;
 const indexOfFirstBook = indexOfLastBook - booksPerPage;
 const currentBooks = filteredBooks.slice(indexOfFirstBook,indexOfLastBook);

    return (
        <div className="book-list-container">
            {loading ? (
                <p className="loading">Loading...</p>
            ) : currentBooks.length > 0 ? (
                <>
                    <div className="book-list">
                        {currentBooks.map((book) => (
                            <div
                                key={book.id}
                                onClick={() => navigate(`/book/${book.id}`)}
                            > <BookCard book={book} toggleWishList={toggleWishList}/>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Component */}
                    <Pagination
                        totalBooks={filteredBooks.length}
                        booksPerPage={booksPerPage}
                        currentPage={currentPage}
                        paginate={setCurrentPage}
                    />
                </>
            ) : (
                <p className="no-book">No data found...</p>
            )}
        </div>
    );
};

export default BookList;
