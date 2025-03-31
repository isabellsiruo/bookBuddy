import { useEffect, useState } from 'react';
import { fetchAllBooks } from '../api';
import BookCard from '../components/BookCard';
import { Grid, Typography, Container, TextField } from '@mui/material';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getBooks() {
      const token = localStorage.getItem('token');
      
      // If no token, do not include 'Authorization' header in the request
      const allBooks = await fetchAllBooks(token);
      console.log("Books API response:", allBooks);

      if (Array.isArray(allBooks)) {
        setBooks(allBooks);
        setFilteredBooks(allBooks); // Initially show all books
      } else {
        setBooks([]);
        setFilteredBooks([]);
      }
      setLoading(false);
    }

    getBooks();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter(book => 
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, books]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
        All Books
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <Typography>Loading books...</Typography>
      ) : filteredBooks && filteredBooks.length > 0 ? (
        <Grid container spacing={2}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No books found.</Typography>
      )}
    </Container>
  );
}

