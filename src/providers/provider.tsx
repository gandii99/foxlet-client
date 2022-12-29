import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../lib/localStorage';
import { CredentialsType } from '../types/authTypes';
import auth from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, SessionType } from '../types/authTypes';
import { APIError } from '../lib/api/types';

export const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionType | null>(null);
  const [isUserChecked, setIsUserChecked] = useState(false);
  const navigate = useNavigate();
  console.log(session);

  useEffect(() => {
    const loggedUser = getLocalStorage('session');
    if (loggedUser) {
      setSession(loggedUser);
    }
    setIsUserChecked(true);
  }, []);

  const login = async (
    credentials: CredentialsType,
    onSucess?: VoidFunction,
    onError?: (error: APIError) => void
  ) => {
    console.log('login');

    auth
      .login(credentials)
      .then(respons => {
        console.log(respons);
        localStorage.setItem('session', JSON.stringify(respons));
        setSession(respons);
        onSucess && onSucess();
      })
      .catch(error => {
        onError && onError(error);
      });
  };

  const logout = async () => {
    localStorage.removeItem('session');
    setSession(null);
    navigate('/');
  };

  const value = { session, login, logout, isUserChecked };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
