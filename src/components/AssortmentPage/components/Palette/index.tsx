import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pallete = () => {
  return (
    <div className="palette-box my-2 px-2 py-3 border rounded-4 border-shadow col-3 mx-1">
      <div className="d-flex justify-content-around align-items-center flex-wrap ">
        <span className="font-m text-nowrap">Paleta 1</span>
        <span className="font-s ">27.12.2022</span>
        <span className="font-m text-nowrap">2345 zł</span>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <div className="products-box border rounded-1 border-shadow mt-2"></div>
        <div className="products-box border rounded-1 border-shadow mt-2"></div>
        <div className="products-box border rounded-1 border-shadow mt-2"></div>
        <div className="products-box border rounded-1 border-shadow mt-2"></div>
        <div className="products-box border rounded-1 border-shadow mt-2"></div>
        <div className="products-box border rounded-1 border-shadow mt-2 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faPlus} className="account-icon w-100" />
        </div>
      </div>
    </div>
  );
};

export default Pallete;
