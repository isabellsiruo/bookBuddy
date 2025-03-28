import { useState } from 'react';
import { registerUser } from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    const result = await registerUser(username, password);
    if (result.success) {
      setMessage('Registration successful! You can now log in.');
    } else {
      setMessage(result.error || 'Registration failed.');
    }
  }

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
