import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import SingleBook from './pages/SingleBook';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/singlebook/:id" element={<SingleBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

