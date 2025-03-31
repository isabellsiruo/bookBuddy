import { useEffect, useState } from 'react';
import { fetchAllBooks } from '../api';
import BookCard from '../components/BookCard';
import { Grid, Typography, Container } from '@mui/material';

export default function Books() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function getBooks() {
      const allBooks = await fetchAllBooks(token);
      console.log("Books API response:", allBooks);

    
      if (Array.isArray(allBooks)) {
        setBooks(allBooks);
      } else {
        setBooks([]); 
      }

      setLoading(false);
    }

    if (token) {
      getBooks();
    } else {
      console.log("No token found");
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
        All Books
      </Typography>

      {loading ? (
        <Typography>Loading books...</Typography>
      ) : books && books.length > 0 ? (
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No books found or not logged in.</Typography>
      )}
    </Container>
  );
}
