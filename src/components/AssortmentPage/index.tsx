import React, { useState } from 'react';
import './index.css';
import {} from '@fortawesome/free-regular-svg-icons';
import Pallete from './components/Palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxesPacking,
  faBuilding,
  faDolly,
  faPallet,
} from '@fortawesome/free-solid-svg-icons';

const AssortmentPage = () => {
  const [activeField, setActiveField] = useState('pallets');

  return (
    <div className="content-min-height d-flex justify-content-around align-items-start flex-wrap m-auto mt-4 mb-4 col-8">
      <aside className="asside-menu-account border border-shadow my-3">
        <div
          role="button"
          className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
            'pallets' === activeField && 'orange-color'
          }`}
          id="pallets"
          onClick={e => setActiveField(e.currentTarget.id)}
        >
          <FontAwesomeIcon icon={faPallet} className="account-icon w-100" />
          <span className="font-s">Palety</span>
        </div>
        <div
          role="button"
          className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
            'products' === activeField && 'orange-color'
          }`}
          id="products"
          onClick={e => setActiveField(e.currentTarget.id)}
        >
          <FontAwesomeIcon icon={faDolly} className="account-icon w-100" />
          <span className="font-s">Produkty</span>
        </div>
        <div
          role="button"
          className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
            'companies' === activeField && 'orange-color'
          }`}
          id="companies"
          onClick={e => setActiveField(e.currentTarget.id)}
        >
          <FontAwesomeIcon icon={faBuilding} className="account-icon w-100" />
          <span className="font-s">Firma</span>
        </div>
        <div
          role="button"
          className={`d-flex justify-content-center align-items-center flex-wrap py-2 ${
            'suppliers' === activeField && 'orange-color'
          }`}
          id="suppliers"
          onClick={e => setActiveField(e.currentTarget.id)}
        >
          <FontAwesomeIcon
            icon={faBoxesPacking}
            className="account-icon w-100"
          />
          <span className="font-s">Dostawcy</span>
        </div>
      </aside>
      <div className="col-xl-9 my-5 d-flex justify-content-start align-items-center flex-wrap">
        <Pallete />
        <Pallete />
        <Pallete />
        <Pallete />
        <Pallete />
        <Pallete />
        <Pallete />
        <Pallete />
        <Pallete />
        <Pallete />
      </div>
    </div>
  );
};

export default AssortmentPage;
