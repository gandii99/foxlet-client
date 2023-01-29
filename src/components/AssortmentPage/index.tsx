import React, { useState } from 'react';
import './../../App.css';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxesPacking,
  faBriefcase,
  faBuilding,
  faCancel,
  faCheck,
  faDolly,
  faPallet,
  faPeopleCarry,
  faPeopleGroup,
  faPerson,
  faShoppingBag,
  faShoppingBasket,
  faTruckMoving,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from 'react-bootstrap';

const AssortmentPage = () => {
  const [activeField, setActiveField] = useState('pallets');

  return (
    <div className="content-min-height d-md-flex justify-content-around align-items-start col-12 m-auto">
      <aside className="mt-md-5 d-flex flex-wrap flex-md-column justify-content-start asside-menu-account ">
        {/* <aside className="mt-md-5 d-flex flex-wrap flex-grow-1 justify-content-center asside-menu-account "> */}

        <NavLink
          to="pallets"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={false}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 border`}
            id="pallets"
          >
            <FontAwesomeIcon icon={faPallet} className="account-icon w-100" />
            <span className="font-16 d-none d-md-block">Palety</span>
          </div>
        </NavLink>

        <NavLink
          to="stock"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={true}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 border`}
            id="stock"
          >
            <FontAwesomeIcon
              icon={faBoxesPacking}
              className="account-icon w-100"
            />
            <span className="font-16 d-none d-md-block">Magazyn</span>
          </div>
        </NavLink>
        <NavLink
          to="suppliers"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={true}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 border`}
            id="suppliers"
          >
            <FontAwesomeIcon
              icon={faTruckMoving}
              className="account-icon w-100"
            />
            <span className="font-16 d-none d-md-block">Dostawcy</span>
          </div>
        </NavLink>
        <NavLink
          to="clients"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={true}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 border`}
            id="clients"
          >
            <FontAwesomeIcon
              icon={faPeopleGroup}
              className="account-icon w-100"
            />
            <span className="font-16 d-none d-md-block">Klienci</span>
          </div>
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={true}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 border`}
            id="orders"
          >
            <FontAwesomeIcon
              icon={faShoppingBasket}
              className="account-icon w-100"
            />
            <span className="font-16 d-none d-md-block">Zamówienia</span>
          </div>
        </NavLink>
        <NavLink
          to="products"
          className={({ isActive }) => clsx(isActive && 'orange-color')}
          end={true}
        >
          <div
            role="button"
            className={`d-flex justify-content-center align-items-center flex-wrap py-2 border`}
            id="products"
          >
            <FontAwesomeIcon icon={faDolly} className="account-icon w-100" />
            <span className="font-16 d-none d-md-block">Produkty</span>
          </div>
        </NavLink>
      </aside>

      <div className="my-3 col-12 col-md-10 px-sm-2 px-md-3 px-lg-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AssortmentPage;
