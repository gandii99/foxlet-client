import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './../../App.css';
import {} from '@fortawesome/free-regular-svg-icons';
import {
  faBoxesPacking,
  faBuilding,
  faDolly,
  faPallet,
  faUser,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import UserForm from './UserForm';
import { Link, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const AccountPage = () => {
  return (
    <div className="content-min-height d-md-flex justify-content-around align-items-start col-12 m-auto ">
      <aside className="mt-md-5 d-flex flex-wrap flex-md-column justify-content-start asside-menu-account ">
        {/* <NavLink to="user" className="bg-warning"> */}
        <NavLink
          to="user"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={false}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 border`}
            id="pallets"
          >
            <FontAwesomeIcon icon={faUser} className="account-icon w-100" />
            <div>
              <span className="font-16 d-none d-md-block">Ja</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="employee"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={true}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 border`}
            id="products"
          >
            <FontAwesomeIcon
              icon={faBriefcase}
              className="account-icon w-100"
            />
            <span className="font-16 d-none d-md-block">Pracownik</span>
          </div>
        </NavLink>
        <NavLink
          to="company"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={true}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 border`}
            id="companies"
          >
            <FontAwesomeIcon icon={faBuilding} className="account-icon w-100" />
            <span className="font-16 d-none d-md-block">Firma</span>
          </div>
        </NavLink>
      </aside>
      <div className="my-3 col-12 col-md-10 px-sm-2 px-md-3 px-lg-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountPage;
