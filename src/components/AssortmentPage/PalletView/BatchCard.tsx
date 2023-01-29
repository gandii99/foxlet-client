import React, { useState } from 'react';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BatchType } from './types';
import clsx from 'clsx';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { onSuccess } from '../../../lib/toastHelpers';
import { useDeleteBatchMutation } from '../../../hooks/mutation/batches';
import DescriptionMore from '../../DescriptionMore';

const BatchCard = (props: BatchType) => {
  const { mutate: deleteBatches, isLoading: isDeleteBatchLoading } =
    useDeleteBatchMutation(() => onSuccess('Partia została usunięta.'));

  const deleteHandler = () => {
    const id_batches = props.id_batch;
    if (id_batches && typeof Number(id_batches) === 'number') {
      deleteBatches([id_batches]);
    }
  };

  return (
    <div className="d-flex justify-content-between col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 px-1 px-lg-2">
      <div
        className={`my-2 p-3 border rounded-4 border-shadow col-12 ${clsx(
          props.condition.id_condition &&
            `color-condition-${props.condition.id_condition}`
        )}`}
      >
        <div className="position-relative d-flex justify-content-center align-items-center">
          <img
            className="card-img-top p-2 image-pallet-batch"
            src={props.product.image || '/images/no-image.svg'}
            alt="Card image cap"
          />
          <div className="position-absolute top-0 end-0 d-flex justify-content-end align-items-center px-1 py-1">
            <Button
              className="button-orange-first bg-danger square-30 mx-1"
              onClick={() => {
                console.log('click');
                deleteHandler();
              }}
              disabled={isDeleteBatchLoading}
            >
              <FontAwesomeIcon
                className="font-xs"
                icon={faTrashCan}
              ></FontAwesomeIcon>
            </Button>
          </div>
        </div>

        <div className="px-2">
          <div className="d-flex justify-content-between ">
            <span className="card-title font-xs">
              Dostawa: {props.quantity_in_delivery}
            </span>
            <span className="font-xs">Magazyn: {props.quantity_in_stock}</span>
          </div>
          <div className="fw-bold font-xs d-flex justify-content-between align-items-center m-0 p-0">
            {props.batch_name}
          </div>
          <div
            className={`font-xs text-uppercase m-0 p-0 ${clsx(
              (props.condition?.condition_name === 'nowy' && 'text-success') ||
                (props.condition?.condition_name === 'używany' &&
                  'text-primary') ||
                (props.condition?.condition_name === 'uszkodzony' &&
                  'text-danger') ||
                (props.condition?.condition_name === 'uszkodzony' &&
                  'text-danger')
            )}`}
          >
            {props.condition?.condition_name}
          </div>

          <DescriptionMore
            text={props.description}
            classSpan="font-14 text-justify"
          />

          <div className="d-flex justify-content-center">
            <p className="card-text">
              <small className="text-muted font-10">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchCard;
