import React, { useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxesPacking,
  faBriefcase,
  faBuilding,
  faCancel,
  faCheck,
  faDolly,
  faMinus,
  faPallet,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from 'react-bootstrap';
import assortmentAPI, { CategoryType } from '../../../services/assortment';
import { BatchType, ProductType } from '../PalletView/types';
import ProductCard from './ProductCard';
import BatchCard from './BatchCard';
import { onError, onSuccess } from '../../../lib/toastHelpers';

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
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    assortmentAPI
      .getAllProducts()
      .then(response => {
        setAllProducts(response);
      })
      .catch(err => {
        console.log('error', err);
      });
  }, []);

  return (
    <div>
      <h2>Wszystkie produkty</h2>
      <div className="d-flex flex-wrap justify-content-start">
        {allProducts.map(product => (
          <ProductCard key={product.id_product} {...product} />
        ))}
      </div>

      <Button type="submit" className="w-100 mt-4 button-orange-first">
        Dodaj sprzedawce
      </Button>
    </div>
  );
};

export default ProductView;
