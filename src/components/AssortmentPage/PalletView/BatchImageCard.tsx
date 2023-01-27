import React from 'react';
import { BatchType } from './types';

interface BatchImageCardPropsType {
  product_name: string;
  batch_name: string;
  image: string;
}

const BatchImageCard = ({
  product_name,
  batch_name,
  image,
}: BatchImageCardPropsType) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center products-box border rounded-1 border-shadow my-1 mx-1 font-xs"
      title={batch_name}
    >
      <img
        className="image-pallet-batch-small p-1 "
        src={image || '/images/no-image.svg'}
        alt={product_name}
      />
    </div>
  );
};

export default BatchImageCard;
