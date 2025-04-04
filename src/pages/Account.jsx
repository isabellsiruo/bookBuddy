import { useEffect, useState } from "react";

export default function Account() {
  const [user, setUser] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setUser(result);

        // Fetch the user's checked-out books
        const booksRes = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/${result.id}/checkedout`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const checkedOutBooksData = await booksRes.json();
        setCheckedOutBooks(checkedOutBooksData);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    }

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading account...</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <p>Your user ID is: {user.id}</p>

      <h3>Checked Out Books</h3>
      {checkedOutBooks.length > 0 ? (
        <ul>
          {checkedOutBooks.map((book) => (
            <li key={book.id}>{book.title} by {book.author}</li>
          ))}
        </ul>
      ) : (
        <p>No books checked out.</p>
      )}
    </div>
  );
}


