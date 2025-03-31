import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, CircularProgress, Button } from "@mui/material";

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

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to checkout a book.");
      return;
    }

    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert("Book checked out successfully!");
      } else {
        alert(result.message || "Failed to checkout book.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("There was an error during checkout.");
    }
  };

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
          <Button onClick={handleCheckout} variant="contained" color="primary" sx={{ mt: 2 }}>
            Checkout Book
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}




