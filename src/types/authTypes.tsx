import { APIError } from '../lib/api/types';

export interface RegisterInputType {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface CredentialsType {
  email: string;
  password: string;
}

export interface SessionType {
  user: {
    id: number;
    name: string;
    role: string;
  };
  token: string;
}

export interface AuthContextType {
  session: SessionType | null;
  login: (
    credentials: CredentialsType,
    onSucess?: VoidFunction,
    onError?: (error: APIError) => void
  ) => void;
  logout: () => void;
}
