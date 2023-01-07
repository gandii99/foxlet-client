import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BatchType, PalletCardType } from './types';

const BatchCard = (props: BatchType) => {
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

export default BatchCard;
