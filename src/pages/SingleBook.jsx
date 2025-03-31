import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log("Single Book API response:", result);
        setBook(result);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <img
        src={book.coverimage}
        alt={book.title}
        style={{ width: "200px", marginTop: "1rem" }}
      />
    </div>
  );
}

