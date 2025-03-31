import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', color: '#4B0082', boxShadow: 'none', padding: 1 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/books" sx={{ textTransform: 'none' }}>
            All Books
          </Button>
          {!token && (
            <>
              <Button component={Link} to="/login" sx={{ textTransform: 'none' }}>
                Login
              </Button>
              <Button component={Link} to="/register" sx={{ textTransform: 'none' }}>
                Register
              </Button>
            </>
          )}
          {token && (
            <>
              <Button component={Link} to="/account" sx={{ textTransform: 'none' }}>
                Account
              </Button>
              <Button onClick={handleLogout} sx={{ textTransform: 'none' }}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

