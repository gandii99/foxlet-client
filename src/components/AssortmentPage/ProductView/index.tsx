import React, { useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxesPacking,
  faBriefcase,
  faBuilding,
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

interface modifiedCategory {
  id_category: number;
  category_name: string;
  category_description: string;
}

export interface ProductToCart {
  id_batch: number;
  count: number;
  quantity_in_stock: number;
  price: number;
}

const ProductView = () => {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [myProducts, setMyProducts] = useState<ProductType[]>([]);
  const [myBatches, setMyBatches] = useState<BatchType[]>([]);
  const [currentOrder, setCurrentOrder] = useState<ProductToCart[]>([]);
  const [currentPriceOrder, setCurrentPriceOrder] = useState<number>(0);

  const changeCountProduct = (batchAddCart: ProductToCart, count: number) => {
    const findBatch = currentOrder.find(
      batch => batch.id_batch === batchAddCart.id_batch
    );
    if (findBatch) {
      const currentOrderAfter = currentOrder
        .map(batch => {
          if (
            batch.id_batch === batchAddCart.id_batch &&
            !(batch.count + count < 0) &&
            !(batch.count + count > batch.quantity_in_stock)
          ) {
            batch.count = batch.count + count;
            // batch.price = batch.price + batchAddCart.price;
          }
          return batch;
        })
        .filter(batch => batch.count > 0);
      setCurrentOrder(currentOrderAfter);
    } else {
      setCurrentOrder([...currentOrder, batchAddCart]);
    }
  };

  useEffect(() => {
    let sum = 0;
    currentOrder.forEach(batch => (sum += batch.price * batch.count));
    setCurrentPriceOrder(sum);
  }, [currentOrder]);

  useEffect(() => {
    assortmentAPI
      .getAllProducts()
      .then(response => {
        setAllProducts(response.data);
      })
      .catch(err => {
        console.log('error', err);
      });

    assortmentAPI
      .getMyBatches()
      .then(response => {
        setMyBatches(response);
      })
      .catch(err => {
        console.log('error', err);
      });

    assortmentAPI
      .getMyProducts()
      .then(response => {
        setMyProducts(response);
      })
      .catch(err => {
        console.log('error', err);
      });
  }, []);
  console.log(myBatches);
  return (
    <div>
      <h2>Twoje partie produktów</h2>

      {currentOrder.length > 0 && (
        <div className="d-flex justify-content-start flex-wrap border">
          <div className="d-flex col-12 justify-content-between">
            <h4>Aktualne zamówienie</h4>
            <div>Suma: {currentPriceOrder}</div>
          </div>
          {currentOrder.map(batch => (
            <div
              className="d-flex flex-wrap justify-content-start align-items-center col-4 border"
              key={batch.id_batch}
            >
              <div className="col-5">Product: {batch.id_batch}</div>
              <div className="col-5">Cena: {batch.price}</div>
              <div className="d-flex justify-content-start col-5">
                <Button
                  name="delete-product"
                  className="button-orange-first square-30"
                  onClick={() => {
                    console.log('click');
                    changeCountProduct(
                      {
                        id_batch: batch.id_batch,
                        count: -1,
                        price: batch.price,
                        quantity_in_stock: batch.quantity_in_stock,
                      },
                      -1
                    );
                  }}
                  disabled={batch.count - 1 < 0}
                >
                  <FontAwesomeIcon
                    className="font-xs"
                    icon={faMinus}
                  ></FontAwesomeIcon>
                </Button>
                <Button
                  name="delete-pallet"
                  className="button-orange-first square-30"
                  onClick={() => {
                    console.log('click');
                    changeCountProduct(
                      {
                        id_batch: batch.id_batch,
                        count: 1,
                        price: batch.price,
                        quantity_in_stock: batch.quantity_in_stock,
                      },
                      1
                    );
                  }}
                  disabled={batch.count + 1 > batch.quantity_in_stock}
                >
                  <FontAwesomeIcon
                    className="font-xs"
                    icon={faPlus}
                  ></FontAwesomeIcon>
                </Button>
              </div>

              <div className="col-5">Sztuk: {batch.count}</div>
            </div>
          ))}
        </div>
      )}
      {/* <span>Aktualnie nie dodałeś jeszcze żadnego sprzedawcy...</span> */}
      <div className="d-flex flex-wrap justify-content-start">
        {myBatches.map(batch => (
          <BatchCard
            key={batch.id_batch}
            {...batch}
            changeCountProduct={changeCountProduct}
            currentCountOrder={
              currentOrder.find(
                currentOrderBatch =>
                  currentOrderBatch.id_batch === batch.id_batch
              )?.count || 0
            }
          />
        ))}
      </div>
      <h2>Wszystkie produkty</h2>
      <div className="d-flex flex-wrap justify-content-start">
        {allProducts.map(product => (
          <ProductCard key={product.id_product} {...product} />
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

export default ProductView;
