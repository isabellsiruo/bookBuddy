import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, CircularProgress } from "@mui/material";

export default function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        const data = await res.json();
        console.log("Single Book API response:", data);
        setBook(data);
      } catch (err) {
        console.error("Error fetching single book:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  if (!book || !book.title) {
    return <Container><Typography>Book not found</Typography></Container>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, p: 2 }}>
        <CardMedia
          component="img"
          image={book.coverimage}
          alt={book.title}
          sx={{ width: { xs: "100%", md: 300 }, height: "auto", objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{book.title}</Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom><strong>Author:</strong> {book.author}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Description:</strong> {book.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
