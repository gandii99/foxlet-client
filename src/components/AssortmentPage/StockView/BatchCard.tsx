import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ProductToCart } from '.';
import { CategoryType } from '../../../services/assortment';
import DescriptionMore from '../../DescriptionMore';
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
    <div className="d-flex justify-content-between align-self-stretch col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 px-1 px-sm-2">
      <div
        className={`my-2 px-3 py-3 border rounded-4 border-shadow col-12 ${clsx(
          condition.id_condition && `color-condition-${condition.id_condition}`
        )}`}
      >
        <div className="position-relative d-flex justify-content-center align-items-center image-batch-product-container">
          <img
            className="p-1 image-batch-product"
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
                  product: product,
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

        <div className="d-flex justify-content-between flex-wrap aling-items-center ">
          <span className="font-12 text-nowrap">EAN: {product.EAN}</span>
          <span className="font-12 text-nowrap">ASIN: {product.ASIN}</span>
        </div>

        <div className="d-flex justify-content-between flex-wrap aling-items-center">
          <div>Partia: {batch_name}</div>
          <span className="font-m text">{product.product_name}</span>
        </div>
        <div className="d-flex justify-content-between flex-wrap aling-items-center">
          <span className="font-14 text-nowrap">
            Szt. {quantity_in_stock - currentCountOrder}
          </span>
          <span className="font-14 text-nowrap">Cena: {selling_price}</span>
        </div>

        <div className="d-flex flex-wrap h-auto mt-2">
          <DescriptionMore
            text={description}
            classSpan="font-14 text-justify"
          />
        </div>
      </div>
    </div>
  );
};

export default BatchCard;
