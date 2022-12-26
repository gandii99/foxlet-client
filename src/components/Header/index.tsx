import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import ButtonNavigate from '../Button';
import './index.css';

const Header: React.FC = () => {
  const { session, logout } = useAuth();
  return (
    <header className="header d-flex justify-content-between header-min-height border-bottom">
      <Link to="/" className="text-decoration-none text-black">
        <div>
          <img
            src={process.env.PUBLIC_URL + 'images/foxlet-logo.jpg'}
            alt="logo lis"
          />
          <span className="logo-text">FoxLet</span>
        </div>
      </Link>
      <div className="d-flex">
        {/* <ButtonNavigate text="Strona Główna" to="/" /> */}
        <ButtonNavigate text="Asortyment" to="/assortment" />

        {session ? (
          <>
            <button className="button-header" onClick={() => logout()}>
              Wyloguj
            </button>
            {/* <ButtonNavigate onClick={() => logout()} text="Wyloguj" to="/" /> */}
            <div className="d-flex justify-content-between align-itmes-center login-header">
              <span>Witaj {session.user.name}!</span>
              <img
                src={process.env.PUBLIC_URL + 'images/wied.jpg'}
                alt="logo lis"
              />
            </div>
          </>
        ) : (
          <>
            <ButtonNavigate text="Rejestracja" to="register" />
            <ButtonNavigate text="Logowanie" to="login" />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
