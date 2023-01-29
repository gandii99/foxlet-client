import {
  faParachuteBox,
  faRightFromBracket,
  faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { AiOutlineCaretDown, AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useGetMyUserProfileQuery } from '../../hooks/query/account';
import { useAuth } from '../../hooks/use-auth';
import ButtonNavigate from '../Button';
import './index.css';

const Header: React.FC = () => {
  const { session, logout } = useAuth();
  const { data: myUserProfile, isSuccess: isGetMyUserProfileSucces } =
    useGetMyUserProfileQuery();

  useEffect(() => {
    console.log('refresh');
    // setRefreshHeader(!refreshHeader);
  }, [myUserProfile]);

  return (
    <header className="header d-flex flex-wrap flex-row justify-content-center justify-content-sm-between align-items-center header-min-height border-bottom py-2 px-sm-3">
      <Link
        to="/"
        className="text-decoration-none text-black order-1 col-auto col-sm-6 col-md-3 col-xl-2 px-2"
      >
        <div className="d-flex justify-content-start align-items-center">
          <img src="/images/foxlet-logo.jpg" alt="logo lis" />
          <span className="logo-text px-1">FoxLet</span>
        </div>
      </Link>

      <div className="d-flex flex-wrap flex-md-nowrap flex-row justify-content-center justify-content-md-center order-3 order-md-2 col-12 col-md-6 col-xl-8 px-sm-3 py-2">
        {session ? (
          <>
            <ButtonNavigate
              text="Konto"
              classLink="font-20 text-nowrap"
              classSpan="d-none d-lg-block "
              to="/account/user"
            >
              <FontAwesomeIcon
                className="font-l"
                icon={faUserPen}
              ></FontAwesomeIcon>
            </ButtonNavigate>
            <ButtonNavigate
              text="Asortyment"
              classLink="font-20 text-nowrap"
              classSpan="d-none d-lg-block "
              to="/assortment/pallets"
            >
              <FontAwesomeIcon
                className="font-l"
                icon={faParachuteBox}
              ></FontAwesomeIcon>
            </ButtonNavigate>
            {/* rounded-2 mx-1 */}
            <button
              className="d-flex justify-content-center align-items-center button-orange-second px-4 py-1 rounded-2 mx-1 fw-bold text-nowrap"
              name="logout"
              onClick={() => logout()}
            >
              <FontAwesomeIcon
                className="font-l"
                icon={faRightFromBracket}
              ></FontAwesomeIcon>
              <span className="d-none d-lg-block">&nbsp; Wyloguj</span>
            </button>
          </>
        ) : (
          <div className="d-flex col-12 justify-content-end">
            <ButtonNavigate
              text="Rejestracja"
              classLink="font-20"
              classSpan=""
              to="register"
            >
              <></>
            </ButtonNavigate>

            <ButtonNavigate
              text="Logowanie"
              classLink="font-20"
              classSpan=" "
              to="login"
            >
              <></>
            </ButtonNavigate>
          </div>
        )}
      </div>
      {session && (
        <div className="d-flex justify-content-center justify-content-sm-end align-itmes-center login-header order-2 order-md-3 col-auto col-sm-6 col-md-3 col-xl-2 px-2">
          <span
            id="user-name"
            className="d-flex justify-content-end align-items-center fw-bold lh-1 2"
          >
            Witaj, {session.user.user_name}!
          </span>
          <img
            className="lh-1 px-0 mx-0"
            src={session?.user.avatar || 'images/blank-avatar.png'}
            alt="avatar"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
