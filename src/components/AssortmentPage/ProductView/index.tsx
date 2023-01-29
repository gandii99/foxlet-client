import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import assortmentAPI, { CategoryType } from '../../../services/assortment';
import { ProductType } from '../PalletView/types';
import ProductCard from './ProductCard';
import { onError, onSuccess } from '../../../lib/toastHelpers';
import { useGetAllProductsQuery } from '../../../hooks/query/assortment';

interface modifiedCategory {
  id_category: number;
  category_name: string;
  category_description: string;
}

export interface ProductToCart {
  id_batch: number;
  quantity_in_order: number;
  price: number;
  quantity_in_stock: number;
}

const ProductView = () => {
  const { data: allProducts, isSuccess: isGetAllProductsSuccess } =
    useGetAllProductsQuery();

  if (!isGetAllProductsSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="d-flex justify-content-center justify-content-md-start">
        Wszystkie produkty
      </h2>
      <div className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-start col-12">
        {allProducts.map(product => (
          <ProductCard key={product.id_product} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductView;
