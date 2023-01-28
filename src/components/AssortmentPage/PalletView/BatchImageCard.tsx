import clsx from 'clsx';
import React from 'react';
import { BatchType } from './types';

interface BatchImageCardPropsType {
  product_name: string;
  batch_name: string;
  image: string;
  id_condition: number;
}

const BatchImageCard = ({
  product_name,
  batch_name,
  image,
  id_condition,
}: BatchImageCardPropsType) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center  border rounded-1 border-shadow my-1 mx-1 font-xs ${clsx(
        id_condition && `color-condition-${id_condition}`
      )}`}
      title={batch_name}
    >
      <div className="d-flex justify-content-center align-items-center image-batch-batch-small-container">
        <img
          className="image-pallet-batch-small p-1 "
          src={image || '/images/no-image.svg'}
          alt={product_name}
        />
      </div>
    </div>
  );
};

export default BatchImageCard;
