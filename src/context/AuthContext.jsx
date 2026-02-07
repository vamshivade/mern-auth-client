import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // If we have a token but no user, fetch the user profile
          // This verifies the token is valid
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user", error);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (userData) => {
    const response = await authService.login(userData);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response); // The login response includes user details
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response); // The register response includes user details
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
