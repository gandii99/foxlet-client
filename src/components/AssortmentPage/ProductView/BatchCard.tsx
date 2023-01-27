import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ProductToCart } from '.';
import { CategoryType } from '../../../services/assortment';
import {
  BatchType,
  ConditionType,
  PalletType,
  ProductType,
} from '../PalletView/types';

interface BatchProps {
  id_batch: number;
  id_pallet: number;
  batch_name: string;
  quantity_in_delivery: number;
  quantity_in_stock: number;
  purchase_price: number;
  selling_price: number;
  description: string;
  product: ProductType;
  condition: ConditionType;
  pallet: PalletType;
  currentCountOrder: number;
  changeCountProduct: (batch: ProductToCart, quantity_in_order: number) => void;
}
const BatchCard = ({
  id_batch,
  id_pallet,
  batch_name,
  quantity_in_delivery,
  quantity_in_stock,
  purchase_price,
  selling_price,
  description,
  product,
  condition,
  pallet,
  currentCountOrder,
  changeCountProduct,
}: BatchProps) => {
  return (
    <div className="my-2 p-2 border rounded-4 border-shadow col-3 mx-1">
      <div className="position-relative d-flex justify-content-center align-items-center">
        <img
          className="card-img-top p-1 image-batch"
          src={product.image || '/images/no-image.svg'}
          alt={product.product_name}
        />
        <Button
          name="delete-pallet"
          className="position-absolute top-0 end-0 button-orange-first square-30"
          onClick={() => {
            changeCountProduct(
              {
                id_batch: id_batch,
                quantity_in_order: 1,
                quantity_in_stock: quantity_in_stock,
                price: selling_price,
              },
              1
            );
          }}
          disabled={currentCountOrder >= quantity_in_stock}
        >
          <FontAwesomeIcon
            className="font-xs"
            icon={faCartShopping}
          ></FontAwesomeIcon>
        </Button>
      </div>

      <div>Partia: {batch_name}</div>

      <div className="d-flex justify-content-between flex-wrap aling-items-center">
        <span className="font-12 text-nowrap">EAN: {product.EAN}</span>
        <span className="font-12 text-nowrap">ASIN: {product.ASIN}</span>
      </div>
      <div>
        <span className="font-m text">{product.product_name}</span>
      </div>
      <div className="d-flex justify-content-between flex-wrap aling-items-center">
        <span className="font-s text">
          W magazynie: {quantity_in_stock - currentCountOrder}
        </span>
        <span className="font-s text">Cena: {selling_price}</span>
      </div>

      <div className="d-flex flex-wrap h-auto">
        <span className="font-xs">{description}</span>
      </div>
    </div>
  );
};

export default BatchCard;
