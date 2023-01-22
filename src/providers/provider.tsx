import React, { useCallback, useEffect, useState } from 'react';
import { getLocalStorage } from '../lib/localStorage';
import { CredentialsType } from '../types/authTypes';
import auth from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, SessionType } from '../types/authTypes';
import { APIError } from '../lib/api/types';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const QueryClient = useQueryClient();

  const [session, setSession] = useState<SessionType | null>(null);
  const [isUserChecked, setIsUserChecked] = useState(false);
  const navigate = useNavigate();
  console.log(session);

  const logout = useCallback(async () => {
    localStorage.removeItem('token');
    QueryClient.removeQueries(['my-user-profile']);
    QueryClient.removeQueries(['my-employee-profile']);
    QueryClient.removeQueries(['my-company']);
    QueryClient.removeQueries(['my-pallets']);
    QueryClient.removeQueries(['pallet']);
    setSession(null);
    navigate('/');
  }, [navigate, QueryClient]);

  const refreshMyUserProfileData = useCallback(async () => {
    console.log('refreshMyUserProfileData');
    try {
      const myUserProfile = await auth.refreshMyUserProfileData();
      console.log(myUserProfile);
      if (myUserProfile) {
        const sessionBody = {
          user: {
            id_user: myUserProfile.id_user,
            user_name: myUserProfile.user_name,
            role: myUserProfile.role,
            avatar: myUserProfile.avatar,
          },
        };
        setSession(sessionBody);
      }
    } catch (e) {
      console.log(e);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const token = getLocalStorage('token');
    if (token) {
      // setSession(loggedUser);
      refreshMyUserProfileData();
    }
    setIsUserChecked(true);
  }, [refreshMyUserProfileData]);

  const login = async (
    credentials: CredentialsType,
    onSucess?: VoidFunction,
    onError?: (error: APIError) => void
  ) => {
    auth
      .login(credentials)
      .then(respons => {
        console.log(respons);
        localStorage.setItem('token', JSON.stringify(respons?.token));
        setSession({ user: respons?.user });
        onSucess && onSucess();
      })
      .catch(error => {
        onError && onError(error);
      });
  };

  const value = {
    session,
    login,
    logout,
    refreshMyUserProfileData,
    isUserChecked,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
