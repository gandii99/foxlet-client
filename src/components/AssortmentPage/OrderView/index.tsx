import React, { useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxesPacking,
  faBriefcase,
  faBuilding,
  faDolly,
  faPallet,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from 'react-bootstrap';
import assortmentAPI, { CategoryType } from '../../../services/assortment';
import { ProductType } from '../PalletView/types';
import ProductCard from './OrderCard';

interface modifiedCategory {
  id_category: number;
  category_name: string;
  category_description: string;
}

const OrderView = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    assortmentAPI
      .getAllProducts()
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => {
        console.log('error', err);
      });
    assortmentAPI
      .getAllCategories()
      .then(response => {
        setCategories(response);
      })
      .catch(err => {
        console.log('error', err);
      });
  }, []);

  const getCategories = (id_category: number): modifiedCategory => {
    const categoryInfo = categories.find(
      category => category.id_category === id_category
    );
    console.log('getCategories', categoryInfo);

    return categoryInfo
      ? {
          id_category: categoryInfo.id_category,
          category_name: categoryInfo.category_name,
          category_description: categoryInfo.description,
        }
      : {
          id_category: 0,
          category_name: '',
          category_description: '',
        };
  };

  return (
    <div>
      <h2>Twoje zamówienia</h2>
      {/* <span>Aktualnie nie dodałeś jeszcze żadnego sprzedawcy...</span> */}
      <div className="d-flex flex-wrap justify-content-start">
        {products.map(product => (
          <ProductCard
            key={product.id_product}
            {...product}
            {...getCategories(product.id_category)}
          />
        ))}
        {/* <ProductCard /> */}
        {/* <SupplierCard /> */}
      </div>

      <Button type="submit" className="w-100 mt-4 button-orange-first">
        Dodaj sprzedawce
      </Button>
    </div>
  );
};

export default OrderView;
