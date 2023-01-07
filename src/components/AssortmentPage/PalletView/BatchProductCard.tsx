import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BatchType, PalletCardType } from './types';
import BatchCard from './BatchCard';
import clsx from 'clsx';

const BatchProductCard = (props: BatchType) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="mx-2 my-2">
      <div
        className={`batch-box border rounded-3 border-shadow ${clsx(
          (props.condition?.condition_name === 'nowy' && 'border-success') ||
            (props.condition?.condition_name === 'używany' &&
              'border-primary') ||
            (props.condition?.condition_name === 'uszkodzony' &&
              'border-danger') ||
            (props.condition?.condition_name === 'uszkodzony' &&
              'border-danger')
        )}`}
      >
        <img
          className="card-img-top "
          src="/images/ps4_pro.png"
          alt="Card image cap"
        />
        <div className="px-2">
          <div className="d-flex justify-content-between ">
            <span className="font-xxs">Magazyn: {props.quantity_in_stock}</span>
            <span className="card-title font-xxs">
              Dostawa: {props.quantity_in_delivery}
            </span>
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

export default BatchProductCard;
