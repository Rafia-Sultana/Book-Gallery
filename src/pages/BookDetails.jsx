import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBooks } from "../services/bookService";
import '../assets/Styles/BookDetails.css';
import { FaHeart } from "react-icons/fa";

const BookDetails = () => {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      try {
        const books = await fetchBooks();
        const foundBook = books.find((b) => b.id.toString() === id);
        if (foundBook) {
          setBook({
            id: foundBook.id,
            authorName: foundBook.authors[0]?.name || "Unknown Author",
            title: foundBook.title,
            coverImage: foundBook.formats["image/jpeg"] || "https://via.placeholder.com/150",
            genre: foundBook.subjects || [],
          });
        }
      } catch (error) {
        console.error("Error loading book:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);


  if (loading) return <p className="loading">Loading...</p>;
  if (!book) return <p>Book not found!</p>;

  return (
    <div className="book-details">
      <img src={book.coverImage} alt={book.title} className="book-details-image" />
      <div className="book-infos">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.authorName}</p>
      <p><strong>Genres:</strong> {book.genre.join(", ")}</p></div>
    </div>
  );
};

export default BookDetails;
