import React from 'react';
import { AuthContext } from '../providers/provider';

export const useAuth = () => {
  return React.useContext(AuthContext);
};
