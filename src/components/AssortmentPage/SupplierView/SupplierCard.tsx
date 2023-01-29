import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDeleteSupplierMutation } from '../../../hooks/mutation/assortment';
import { onSuccess } from '../../../lib/toastHelpers';
import { SupplierCardType } from './types';

const SupplierCard = ({
  id_supplier,
  first_name,
  last_name,
  supplier_name,
  NIP,
  REGON,
  phone,
  email,
  country,
  province,
  postal_code,
  city,
  street,
}: SupplierCardType) => {
  const { mutate: deleteSupplier, isLoading: isDeleteSupplierLoading } =
    useDeleteSupplierMutation(() => {
      onSuccess('Klient został usunięty');
    });

  const deleteHandler = () => {
    deleteSupplier(id_supplier);
  };
  return (
    <div className="d-flex justify-content-between col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 px-1 px-lg-2">
      <div className="position-relative my-2 p-3 border rounded-4 border-shadow col-12">
        <div className="position-absolute top-0 end-0 d-flex justify-content-end align-items-center px-1 py-1">
          <Button
            className="button-orange-first bg-danger square-30 mx-1"
            onClick={() => {
              console.log('click');
              deleteHandler();
            }}
            disabled={isDeleteSupplierLoading}
          >
            <FontAwesomeIcon
              className="font-xs"
              icon={faTrashCan}
            ></FontAwesomeIcon>
          </Button>

          {/* <Link
              className="button-orange-first square-30"
              to={`${props.id_pallet}`}
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="font-xs"
              ></FontAwesomeIcon>
            </Link> */}
        </div>
        <div className="d-flex justify-content-around align-items-center flex-wrap "></div>
        <div className="font-20">{supplier_name}</div>
        <div className="lh-1">
          <span className="font-14 text-muted">Właściciel:</span>
          <div className="font-18 text-nowrap">
            {first_name} {last_name}
          </div>
        </div>
        <div className="my-1 lh-1">
          <span className="font-14 text-muted">Kontakt:</span>
          <div className="font-16 text-nowrap">{phone}</div>
          <div className="font-16 text-nowrap">{email}</div>
        </div>
        <div className="my-1 lh-1">
          <span className="font-14 text-muted">Adres:</span>
          <div className="font-m text-nowrap">
            <span className="font-16">
              {postal_code} {city}
            </span>
          </div>
          <div className="font-m text-nowrap">
            <span className="font-16">
              {street}, {country}
            </span>
          </div>
        </div>
        {(REGON || NIP) && (
          <div className="mt-3 lh-1">
            {/* <span className="font-14 text-muted">{REGON ? 'REGON' : 'NIP'}</span> */}
            <div className="font-14 text-nowrap">
              <span className="font-14 text-muted">
                {REGON ? 'REGON' : 'NIP'}:
              </span>{' '}
              {REGON || NIP}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierCard;
