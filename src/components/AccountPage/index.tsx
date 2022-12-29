import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './index.css';
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
  const [activeField, setActiveField] = useState('pallets');

  return (
    <div className="content-min-height d-flex justify-content-around align-items-start col-xl-8 m-auto">
      <aside className="asside-menu-account border border-shadow my-5">
        {/* <NavLink to="user" className="bg-warning"> */}
        <NavLink
          to="user"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={false}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap pt-2`}
            id="pallets"
            // onClick={e => setActiveField(e.currentTarget.id)}
          >
            <FontAwesomeIcon icon={faUser} className="account-icon w-100" />
            <div>
              <span className="font-s ">Ja</span>
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
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
              'products' === activeField && 'orange-color'
            }`}
            id="products"
            // onClick={e => setActiveField(e.currentTarget.id)}
          >
            <FontAwesomeIcon
              icon={faBriefcase}
              className="account-icon w-100"
            />
            <span className="font-s">Pracownik</span>
          </div>
        </NavLink>
        <NavLink
          to="company"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={true}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
              'companies' === activeField && 'orange-color'
            }`}
            id="companies"
            // onClick={e => setActiveField(e.currentTarget.id)}
          >
            <FontAwesomeIcon icon={faBuilding} className="account-icon w-100" />
            <span className="font-s">Firma</span>
          </div>
        </NavLink>
        <NavLink
          to="suppliers"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={true}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
              'suppliers' === activeField && 'orange-color'
            }`}
            id="suppliers"
            // onClick={e => setActiveField(e.currentTarget.id)}
          >
            <FontAwesomeIcon
              icon={faBoxesPacking}
              className="account-icon w-100"
            />
            <span className="font-s">Dostawcy</span>
          </div>
        </NavLink>
      </aside>
      <div className="col-xl-6 my-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountPage;
