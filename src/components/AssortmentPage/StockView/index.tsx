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
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from 'react-bootstrap';
import assortmentAPI, { CategoryType } from '../../../services/assortment';
import { BatchType, ProductType } from '../PalletView/types';
import ProductCard from './ProductCard';
import BatchCard from './BatchCard';
import { onError, onSuccess } from '../../../lib/toastHelpers';
import {
  useGetMyBatchesQuery,
  useGetMyBatchesSoldQuery,
  useGetMyClientsQuery,
} from '../../../hooks/query/assortment';

export interface ProductToCart {
  id_batch: number;
  quantity_in_order: number;
  price: number;
  quantity_in_stock: number;
  image?: string;
  product: ProductType;
}

const StockView = () => {
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState<ProductToCart[]>([]);
  const [currentPriceOrder, setCurrentPriceOrder] = useState<number>(0);
  const [selectedClient, setSelectedClient] = useState<number | string>('');
  const { data: myClients, isSuccess: isGetMyClientsSucces } =
    useGetMyClientsQuery();
  const { data: myBatches, isSuccess: isGetMyBatchesSucces } =
    useGetMyBatchesQuery();
  const { data: myBatchesSold, isSuccess: isGetMyBatchesSoldSucces } =
    useGetMyBatchesSoldQuery();

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

  const confirmOrder = async () => {
    const ordersBatches = currentOrder.map(order => {
      return {
        id_batch: order.id_batch,
        quantity_in_order: order.quantity_in_order,
      };
    });
    if (selectedClient != '') {
      const createdOrder = await assortmentAPI
        .createOrder(
          {
            id_client: Number(selectedClient),
            order_date: new Date().toISOString(),
            order_price: currentPriceOrder,
            comments: '',
            batches: ordersBatches,
          },
          () => onSuccess('Zamówienie zostało złożone!'),
          e => onError(e, 'Problem podczas składania zamówienia')
        )
        .then(() => {
          cancelOrder();
          navigate('/assortment/orders');
        });

      console.log(createdOrder);
    }
  };
  const cancelOrder = () => {
    setCurrentOrder([]);
    setCurrentPriceOrder(0);
  };

  return (
    <div>
      <div>
        <h2 className="px-sm-2 d-flex justify-content-center justify-content-md-start">
          Magazyn
        </h2>

        {currentOrder.length > 0 && (
          <div className="d-flex justify-content-start flex-wrap border border-shadow rounded">
            <form
              onSubmit={e => {
                e.preventDefault();
                confirmOrder();
              }}
              className="d-flex flex-wrap col-12 justify-content-between align-items-center orange-background rounded-top"
            >
              <span className="text-white font-l px-4 py-2">
                Aktualne zamówienie
              </span>
              <label className="d-flex font-m text-white my-2">
                <span className="mx-2">Klient:</span>
                <select
                  className="form-control py-0"
                  value={selectedClient}
                  onChange={e => setSelectedClient(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Wybierz
                  </option>
                  {isGetMyClientsSucces &&
                    myClients.map(client => (
                      <option key={client.id_client} value={client.id_client}>
                        {client.client_name}
                      </option>
                    ))}
                </select>
                {/* {errors.id_supplier && (
          <span className="font-13 text-danger">
            {errors.id_supplier.message}
          </span>
        )} */}
              </label>
              <div className="text-white font-l">
                Cena: {currentPriceOrder} zł
              </div>
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
                  type="submit"
                >
                  <FontAwesomeIcon
                    className="font-xs"
                    icon={faCheck}
                  ></FontAwesomeIcon>
                </Button>
              </div>
            </form>

            {currentOrder.map(batch => (
              <div
                className="d-flex flex-wrap justify-content-between align-items-center col-12 px-sm-3 border"
                key={batch.id_batch}
              >
                <div className="d-flex justify-content-start align-items-center col-6 p-1">
                  <div className="d-flex justify-content-center align-items-center image-product-order">
                    <img
                      className="image-pallet-batch-small p-1 "
                      src={batch.product.image || '/images/no-image.svg'}
                      alt={''}
                    />
                  </div>
                  <div className="col-5 mx-3">{batch.product.product_name}</div>
                </div>

                <div className="d-flex justify-content-start align-items-center col-6">
                  <div className="d-flex justify-content-start col-4">
                    Sztuk: {batch.quantity_in_order}
                  </div>
                  <div className="d-flex justify-content-center col-4 ">
                    {batch.price.toFixed(2)} zł
                  </div>
                  <div className="d-flex flex-wrap justify-content-end col-4">
                    <Button
                      name="delete-product"
                      className="button-orange-second square-30 mx-1"
                      onClick={() => {
                        console.log('click');
                        changeCountProduct(
                          {
                            id_batch: batch.id_batch,
                            quantity_in_order: -1,
                            price: batch.price,
                            quantity_in_stock: batch.quantity_in_stock,
                            product: batch.product,
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
                      className="button-orange-second square-30"
                      onClick={() => {
                        console.log('click');
                        changeCountProduct(
                          {
                            id_batch: batch.id_batch,
                            quantity_in_order: 1,
                            price: batch.price,
                            quantity_in_stock: batch.quantity_in_stock,
                            product: batch.product,
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
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-start col-12">
          {isGetMyBatchesSucces && myBatches.length > 0 ? (
            myBatches.map(batch => (
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
            ))
          ) : (
            <span className="mt-2">Brak produktów na magazynie</span>
          )}
        </div>
      </div>
      {isGetMyBatchesSoldSucces && myBatchesSold.length > 0 && (
        <div className="mt-4">
          <h2>Wyprzedane</h2>
          <div className="d-flex flex-wrap justify-content-start ">
            {myBatchesSold.map(batch => (
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
        </div>
      )}
    </div>
  );
};

export default StockView;
