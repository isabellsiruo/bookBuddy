import { useEffect, useState } from "react";

export default function Account() {
  const [user, setUser] = useState(null);

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
        if (result) {
          setUser(result);
        }
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
    </div>
  );
}

