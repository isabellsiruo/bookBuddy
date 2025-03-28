import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/books" style={{ marginRight: '10px' }}>All Books</Link>
      <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
      <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
      <Link to="/account">Account</Link>
    </nav>
  );
}

