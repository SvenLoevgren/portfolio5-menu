import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const SignInComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Access the login function from AuthContext

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        'https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/api/token/',
        {
          username,
          password,
        }
      );

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      // Call the login function to set authenticated state and store tokens
      login(accessToken, refreshToken);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignInComponent;
