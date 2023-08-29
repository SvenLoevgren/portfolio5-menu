import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// const BASE_URL = process.env.BASE_URL;
const BASE_URL= "https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/"
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

  // Check if the user is authenticated on component mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
        await axios.get(`${BASE_URL}api/token/verify/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Use the access token stored in local storage
            },
        });
        setAuthenticated(true);
        const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        } catch (error) {
            setAuthenticated(false);
            setUsername('');
        }
    };

    const isAuthenticated = () => {
        if(localStorage.getItem('username') !== null) { 
            setAuthenticated(true);
            setUsername(localStorage.getItem('username'));
        return true;
    } else {
        return false;
    } 
};

    const login = async (username, password) => {
        try {
            if(!isAuthenticated()) {
                const response = await axios.post(`${BASE_URL}api/token/`, {
                    username,
                    password,
                });

                localStorage.setItem('access_token', response.data.access); // Store the access token
                localStorage.setItem('refresh_token', response.data.refresh); // Store the refresh token
                localStorage.setItem('username', username);
                setAuthenticated(true);
                setUsername(username); // Set the username
            }
        } catch (error) {
            setAuthenticated(false);
            setUsername('');
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token'); // Clear the access token
        localStorage.removeItem('refresh_token'); // Clear the refresh token
        localStorage.removeItem('username');
        setAuthenticated(false);
        setUsername(''); // Clear the username
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
