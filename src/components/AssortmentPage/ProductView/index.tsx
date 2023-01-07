import React, { useState } from 'react';
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
import { Button } from 'react-bootstrap';

const ProductView = () => {
  const [activeField, setActiveField] = useState('pallets');

  return (
    <div>
      <h2>Twoje produkty</h2>
      {/* <span>Aktualnie nie dodałeś jeszcze żadnego sprzedawcy...</span> */}
      <div className="d-flex">
        {/* <ProductCard /> */}
        {/* <SupplierCard /> */}
      </div>

      <Button type="submit" className="w-100 mt-4 button-orange-first">
        Dodaj sprzedawce
      </Button>
    </div>
  );
};

export default ProductView;
