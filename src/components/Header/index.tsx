import React, { useEffect, useState } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import ButtonNavigate from '../Button';
import './index.css';

const Header: React.FC = () => {
  const { session, logout } = useAuth();

  useEffect(() => {
    console.log('refresh');
    // setRefreshHeader(!refreshHeader);
  }, [session]);

  return (
    <header className="header d-flex flex-wrap justify-content-between m-auto header-min-height border-bottom">
      <Link to="/" className="text-decoration-none text-black">
        <div>
          <img src="/images/foxlet-logo.jpg" alt="logo lis" />
          <span className="logo-text">FoxLet</span>
        </div>
      </Link>

      <div className="d-flex flex-wrap">
        {session ? (
          <>
            <ButtonNavigate text="Konto" to="/account/user" />
            <ButtonNavigate text="Asortyment" to="/assortment/pallets" />
            <button className="button-header" onClick={() => logout()}>
              Wyloguj
            </button>
            <div className="d-flex justify-content-between align-itmes-center login-header">
              <span>Witaj, {session.user.user_name}!</span>
              <img
                src={session?.user.avatar || 'images/blank-avatar.png'}
                alt="avatar"
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
