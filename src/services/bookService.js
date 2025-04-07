const BASE_URL = "https://gutendex.com/books/";

export const fetchBooks = async ()=>{
    try {
       const response = await fetch(BASE_URL);
       const data = await response.json();
      
       return data.results; 
    } catch (error) {
        console.error("Error fetching books", error);
        return null;
    }
}

export const fetchBookDetails = async(bookId) =>{
    try {
        const response = await fetch(`${BASE_URL}${bookId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching books", error);
        return null;  
    }
}