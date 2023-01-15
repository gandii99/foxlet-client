import React, { useState } from 'react';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BatchType } from './types';
import clsx from 'clsx';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { onSuccess } from '../../../lib/toastHelpers';
import { useDeleteBatchMutation } from '../../../hooks/mutation/batches';

const BatchCard = (props: BatchType) => {
  const { mutate: deleteBatches, isLoading: isDeleteBatchLoading } =
    useDeleteBatchMutation(() => onSuccess('Partia została usunięta.'));

  const deleteHandler = () => {
    const id_batches = props.id_batch;
    if (id_batches && typeof Number(id_batches) === 'number') {
      deleteBatches([id_batches]);
    }
  };

  const [showMore, setShowMore] = useState(false);
  return (
    <div className="mx-2 my-2">
      <div
        className={`position-relative batch-box border rounded-3 border-shadow ${clsx(
          (props.condition?.condition_name === 'nowy' && 'border-success') ||
            (props.condition?.condition_name === 'używany' &&
              'border-primary') ||
            (props.condition?.condition_name === 'uszkodzony' &&
              'border-danger') ||
            (props.condition?.condition_name === 'uszkodzony' &&
              'border-danger')
        )}`}
      >
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
        <img
          className="card-img-top "
          src="/images/ps4_pro.png"
          alt="Card image cap"
        />
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

          <p className="font-xs mb-0 ">
            {showMore
              ? props.description
              : `${
                  props.description && props.description.substring(0, 38)
                }... `}
            <span
              className="font-xs  border rounded-3 px-1"
              role="button"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Ukryj' : 'Więcej'}
            </span>
          </p>

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
