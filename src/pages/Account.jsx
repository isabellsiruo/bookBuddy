import { useEffect, useState } from 'react';
import { fetchUserDetails } from '../api';

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await fetchUserDetails(token);
        setUser(userData);
      }
    }
    getUser();
  }, []);

  if (!user) {
    return <p>Please log in to view your account details.</p>;
  }

  return (
    <div>
      <h2>Account Page</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>ID:</strong> {user.id}</p>
    </div>
  );
}
