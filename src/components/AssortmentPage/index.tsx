import React, { useState } from 'react';
import './index.css';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxesPacking,
  faBriefcase,
  faBuilding,
  faDolly,
  faPallet,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

const AssortmentPage = () => {
  const [activeField, setActiveField] = useState('pallets');

  return (
    <div className="content-min-height d-flex justify-content-center align-items-start col-10 m-auto">
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
      </aside>
      <div className="my-3 col-9 px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AssortmentPage;
