import React from 'react';
import { BatchType } from './types';

const BatchImageCard = (props: BatchType) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center products-box border rounded-1 border-shadow my-1 mx-1 font-xs"
      title={props.batch_name}
    >
      <img
        className="card-img-top "
        src="/images/ps4_pro.png"
        alt="Card image cap"
      />
    </div>
  );
};

export default BatchImageCard;
