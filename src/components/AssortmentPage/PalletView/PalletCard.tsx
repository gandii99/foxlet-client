import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PalletCardType } from './types';
import './index.css';
import BatchCard from './BatchCard';
import { Link } from 'react-router-dom';

function formatDate(date: string) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
const emptyToText = (text: string) => (text && text.length > 0 ? text : 'Brak');
const PalletCard = (props: PalletCardType) => {
  console.log(props);
  return (
    <div className="palette-box my-2 px-3 py-3 border rounded-4 border-shadow mx-2">
      <div className="d-flex justify-content-start align-items-start flex-wrap ">
        <div className="col-6 mb-2">
          <span className="d-block font-11 lh-1 text-muted">Nazwa: </span>
          <span className="d-block font-s fw-bold">
            {emptyToText(props.pallet_name || '')}
          </span>
        </div>
        <div className="col-6 mb-2">
          <span className="d-block font-11 lh-1 text-muted">Dostawca: </span>
          <span
            className="d-block font-s fw-bold text-nowrap overflow-hidden"
            title={props?.supplier?.supplier_name}
          >
            {emptyToText(props?.supplier?.supplier_name || '')}
          </span>
        </div>
        <div className="col-6 mb-2">
          <span className="d-block font-11 lh-1 text-muted">Dostawa:</span>{' '}
          <span className="d-block font-s fw-bold ">
            {formatDate(props?.delivery_date || '')}
          </span>
        </div>
        <div className="col-6 mb-2 ">
          <span className="d-block font-11 lh-1 text-muted">Zakup:</span>
          <span className="d-block font-s fw-bold">
            {formatDate(props?.purchase_date || '')}
          </span>
        </div>
        <div className="col-6">
          <span className="d-block font-11 lh-1 text-muted">Cena:</span>
          <span className="d-block font-s fw-bold">{props.purchase_price}</span>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        {props.batch
          ? props.batch.map(batch => {
              console.log(batch);
              console.log(batch.id_batch);
              return <BatchCard key={batch.id_batch} {...batch} />;
            })
          : null}

        <div className="products-box border rounded-1 border-shadow my-1 mx-1 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faPlus} className="account-icon w-100" />
        </div>
      </div>

      <Link
        className="button-orange-first font-m m-a"
        to={`${props.id_pallet}`}
      >
        Zarządzaj
      </Link>
    </div>
  );
};

export default PalletCard;
