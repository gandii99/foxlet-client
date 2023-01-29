import React, { useEffect, useState } from 'react';
import { CategoryType } from '../../../services/assortment';
import { ProductType } from '../PalletView/types';

interface ProductCardPropsType {
  id_product: number;
  id_category: number;
  product_name: string;
  EAN: string;
  ASIN: string;
  description: string;
  image: string;
  category: CategoryType;
}

const ProductCard = ({
  id_product,
  id_category,
  product_name,
  EAN,
  ASIN,
  description,
  image,
  category,
}: ProductCardPropsType) => {
  return (
    <div className="d-flex justify-content-between align-self-stretch col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 px-1 px-sm-2">
      <div className="my-2 px-2 py-3 border rounded-4 border-shadow col-12">
        <div className="d-flex justify-content-between aling-items-center ">
          <div>
            <div className="square-164">
              <img
                className="p-1 image-batch-product "
                src={image || '/images/aparat.jpg'}
                alt={product_name}
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-start aling-items-start">
            <span className="font-14 fw-bold text">{product_name}</span>
            <span className="font-12 text-nowrap">EAN: {EAN}</span>
            <span className="font-12 text-nowrap">ASIN: {ASIN}</span>
          </div>
        </div>
        <div>
          <span className="font-14">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
