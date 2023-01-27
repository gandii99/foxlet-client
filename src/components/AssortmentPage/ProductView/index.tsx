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
  quantity_in_stock: number;
  price: number;
}

const ProductView = () => {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [myProducts, setMyProducts] = useState<ProductType[]>([]);
  const [myBatches, setMyBatches] = useState<BatchType[]>([]);
  const [currentOrder, setCurrentOrder] = useState<ProductToCart[]>([]);
  const [currentPriceOrder, setCurrentPriceOrder] = useState<number>(0);

  const changeCountProduct = (
    batchAddCart: ProductToCart,
    quantity_in_order: number
  ) => {
    const findBatch = currentOrder.find(
      batch => batch.id_batch === batchAddCart.id_batch
    );
    if (findBatch) {
      const currentOrderAfter = currentOrder
        .map(batch => {
          if (
            batch.id_batch === batchAddCart.id_batch &&
            !(batch.quantity_in_order + quantity_in_order < 0) &&
            !(
              batch.quantity_in_order + quantity_in_order >
              batch.quantity_in_stock
            )
          ) {
            batch.quantity_in_order =
              batch.quantity_in_order + quantity_in_order;
            // batch.price = batch.price + batchAddCart.price;
          }
          return batch;
        })
        .filter(batch => batch.quantity_in_order > 0);
      setCurrentOrder(currentOrderAfter);
    } else {
      setCurrentOrder([...currentOrder, batchAddCart]);
    }
  };

  useEffect(() => {
    let sum = 0;
    currentOrder.forEach(
      batch => (sum += batch.price * batch.quantity_in_order)
    );
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

  const confirmOrder = async () => {
    const ordersBatches = currentOrder.map(order => {
      return {
        id_batch: order.id_batch,
        quantity_in_order: order.quantity_in_order,
      };
    });

    const createdOrder = await assortmentAPI.createOrder(
      {
        id_client: 1,
        order_date: new Date().toISOString(),
        order_price: currentPriceOrder,
        comments: '',
        batches: ordersBatches,
      },
      () => onSuccess('Zamówienie zostało złożone!'),
      e => onError(e, 'Problem podczas składania zamówienia')
    );

    console.log(createdOrder);
  };
  const cancelOrder = () => {
    setCurrentOrder([]);
    setCurrentPriceOrder(0);
  };

  return (
    <div>
      <h2>Twoje partie produktów</h2>

      {currentOrder.length > 0 && (
        <div className="d-flex justify-content-start flex-wrap border">
          <div className="d-flex flex-wrap col-12 justify-content-between align-items-center orange-background">
            <span className="text-white font-l">Aktualne zamówienie</span>
            <div className="d-flex">
              <Button
                name="delete-pallet"
                className="button-orange-first bg-danger square-30 mx-1"
                onClick={() => cancelOrder()}
              >
                <FontAwesomeIcon
                  className="font-xs"
                  icon={faCancel}
                ></FontAwesomeIcon>
              </Button>
              <Button
                name="confirm-order"
                className="button-orange-first bg-success square-30 mx-1"
                onClick={() => confirmOrder()}
              >
                <FontAwesomeIcon
                  className="font-xs"
                  icon={faCheck}
                ></FontAwesomeIcon>
              </Button>
            </div>
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
                        quantity_in_order: -1,
                        price: batch.price,
                        quantity_in_stock: batch.quantity_in_stock,
                      },
                      -1
                    );
                  }}
                  disabled={batch.quantity_in_order - 1 < 0}
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
                        quantity_in_order: 1,
                        price: batch.price,
                        quantity_in_stock: batch.quantity_in_stock,
                      },
                      1
                    );
                  }}
                  disabled={
                    batch.quantity_in_order + 1 > batch.quantity_in_stock
                  }
                >
                  <FontAwesomeIcon
                    className="font-xs"
                    icon={faPlus}
                  ></FontAwesomeIcon>
                </Button>
              </div>

              <div className="col-5">Sztuk: {batch.quantity_in_order}</div>
            </div>
          ))}
          <div>Suma: {currentPriceOrder}</div>
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
              )?.quantity_in_order || 0
            }
          />
        ))}
      </div>
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
