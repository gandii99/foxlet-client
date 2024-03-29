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
  category: CategoryType;
}

const ProductCard = ({
  id_product,
  id_category,
  product_name,
  EAN,
  ASIN,
  description,
  category,
}: ProductCardPropsType) => {
  return (
    <div className="my-2 px-2 py-3 border rounded-4 border-shadow col-3 mx-1">
      {/* <div>{category_name}</div> */}
      <div className="d-flex justify-content-between flex-wrap aling-items-center">
        <span className="font-12 text-nowrap">EAN: {EAN}</span>
        <span className="font-12 text-nowrap">ASIN: {ASIN}</span>
      </div>
      <div>
        <span className="font-m text">{product_name}</span>
      </div>

      <div className="d-flex flex-wrap h-auto">
        <span className="font-xs">{description}</span>
      </div>
    </div>
  );
};

export default ProductCard;
