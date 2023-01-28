import React, { useState } from 'react';
import { faPlus, faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PalletCardType } from './types';
import BatchImageCard from './BatchImageCard';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { onSuccess, onError } from '../../../lib/toastHelpers';
import { useDeletePalletsMutation } from '../../../hooks/mutation/assortment';
import ModalWrapper from '../../ModalWrapper';
import BatchCreate from './BatchCreate';

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
  const [modalActive, setModalActive] = useState(false);
  const { mutate: deletePallet, isLoading: isDeletePalletLoading } =
    useDeletePalletsMutation(() => onSuccess('Paleta została usunięta'));

  const deleteHandler = () => {
    const id_pallet = props.id_pallet;
    if (id_pallet && typeof Number(id_pallet) === 'number') {
      deletePallet([id_pallet]);
    }
  };

  const handleCloseModal = () => {
    setModalActive(!modalActive);
  };
  // palette-box
  return (
    <div className="p-1 col-lg-6 col-xl-3 pallet-min-width flex-grow-1 ">
      {/* <div className="my-2 px-3 py-3 border rounded-4 border-shadow mx-2 pallet-min-width"> */}
      <div className="my-2 px-3 py-3 border rounded-4 border-shadow ">
        <div className="d-flex justify-content-start align-items-start flex-wrap ">
          <div className="col-6 mb-2">
            <span className="d-block font-11 lh-1 text-muted">Nazwa: </span>
            <span className="d-block font-s fw-bold text-nowrap">
              {emptyToText(props.pallet_name || '')}
            </span>
          </div>
          <div className="d-flex  justify-content-end align-items-center col-6 mb-2">
            <Button
              name="delete-pallet"
              className="button-orange-first bg-danger square-30 mx-1"
              onClick={() => {
                console.log('click');
                deleteHandler();
              }}
              disabled={isDeletePalletLoading}
            >
              <FontAwesomeIcon
                className="font-xs"
                icon={faTrashCan}
              ></FontAwesomeIcon>
            </Button>

            <Link
              className="button-orange-first square-30"
              to={`${props.id_pallet}`}
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="font-xs"
              ></FontAwesomeIcon>
            </Link>
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
            <span className="d-block font-11 lh-1 text-muted">Dostawa:</span>
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
            <span className="d-block font-s fw-bold">
              {props.purchase_price}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {props.batch
            ? props.batch.map((batch, index) => {
                if (index >= 3) return;
                return (
                  <BatchImageCard
                    key={batch.id_batch}
                    batch_name={batch.batch_name}
                    image={batch.product.image}
                    product_name={batch.product.product_name}
                    id_condition={batch.condition.id_condition}
                  />
                );
              })
            : null}

          <div
            role="button"
            className="image-batch-batch-small-container border rounded-1 border-shadow my-1 mx-1 d-flex justify-content-center align-items-center "
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon={faPlus} className="account-icon w-100" />
          </div>
        </div>
        {modalActive && (
          <ModalWrapper
            title={'Dodaj partię'}
            handleCloseModal={handleCloseModal}
          >
            <BatchCreate
              id_pallet={Number(props.id_pallet)}
              handleCloseModal={handleCloseModal}
            />
          </ModalWrapper>
        )}
      </div>
    </div>
  );
};

export default PalletCard;
