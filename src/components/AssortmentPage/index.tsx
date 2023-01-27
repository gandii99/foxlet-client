import React, { useState } from 'react';
import './index.css';
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
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from 'react-bootstrap';

const AssortmentPage = () => {
  const [activeField, setActiveField] = useState('pallets');

  return (
    <div className="content-min-height d-flex justify-content-center align-items-start col-10 m-auto">
      <div className="col-2">
        <aside className="asside-menu-account border border-shadow my-5 mx-5 col-1">
          <NavLink
            to="pallets"
            className={({ isActive }) => clsx(isActive && 'orange-color')}
            end={false}
          >
            <div
              role="button"
              className={`d-flex justify-content-center align-items-center flex-wrap pt-2`}
              id="pallets"
            >
              <FontAwesomeIcon icon={faPallet} className="account-icon w-100" />
              <div>
                <span className="font-s ">Palety</span>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="products"
            className={({ isActive }) => clsx(isActive && 'orange-color')}
            end={true}
          >
            <div
              role="button"
              className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
                'products' === activeField && 'orange-color'
              }`}
              id="products"
            >
              <FontAwesomeIcon icon={faDolly} className="account-icon w-100" />
              <span className="font-s">Produkty</span>
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
            >
              <FontAwesomeIcon
                icon={faBoxesPacking}
                className="account-icon w-100"
              />
              <span className="font-s">Dostawcy</span>
            </div>
          </NavLink>
          <NavLink
            to="clients"
            className={({ isActive }) => clsx(isActive && 'orange-color')}
            end={true}
          >
            <div
              role="button"
              className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
                'clients' === activeField && 'orange-color'
              }`}
              id="clients"
            >
              <FontAwesomeIcon
                icon={faPeopleGroup}
                className="account-icon w-100"
              />
              <span className="font-s">Klienci</span>
            </div>
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) => clsx(isActive && 'orange-color')}
            end={true}
          >
            <div
              role="button"
              className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
                'orders' === activeField && 'orange-color'
              }`}
              id="orders"
            >
              <FontAwesomeIcon
                icon={faShoppingBasket}
                className="account-icon w-100"
              />
              <span className="font-s">Zamówienia</span>
            </div>
          </NavLink>
        </aside>
        <aside className="d-flex flex-wrap justify-content-around align-items-start asside-shopcart border border-shadow">
          <div className="d-flex justify-content-between col-12 orange-background">
            Header
            <Button
              name="delete-pallet"
              className="button-orange-first bg-danger square-30 mx-1"
              // onClick={() => {
              // }}
            >
              <FontAwesomeIcon
                className="font-xs"
                icon={faCancel}
              ></FontAwesomeIcon>
            </Button>
          </div>
          <div className="col-12">Koszyk</div>
          <div className="col-12">
            <div>Suma</div>
            <Button
              name="delete-pallet"
              className="button-orange-first square-30 mx-1"
              // onClick={() => {
              // }}
            >
              <FontAwesomeIcon
                className="font-xs"
                icon={faCheck}
              ></FontAwesomeIcon>
            </Button>
          </div>
        </aside>
      </div>
      <div className="my-3 col-10 px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AssortmentPage;
