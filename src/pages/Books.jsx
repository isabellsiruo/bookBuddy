import { useEffect, useState } from 'react';
import { fetchAllBooks } from '../api';
import BookCard from '../components/BookCard';
import { Grid, Typography, Container } from '@mui/material';

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const allBooks = await fetchAllBooks();
      setBooks(allBooks);
    }
    getBooks();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
        All Books
      </Typography>
      <Grid container spacing={2}>
        {Array.isArray(books) && books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
