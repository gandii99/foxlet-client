import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDeleteOrderMutation } from '../../../hooks/mutation/assortment';
import { onSuccess } from '../../../lib/toastHelpers';
import assortmentAPI, { OrderType } from '../../../services/assortment';
import BatchImageCard from '../PalletView/BatchImageCard';
import { ProductType } from '../PalletView/types';

interface OrderCardPropsType {
  id_product: number;
  id_category: number;
  product_name: string;
  EAN: string;
  ASIN: string;
  description: string;
  category_name: string;
  category_description: string;
}

const OrderCard = ({
  id_order,
  order_date,
  order_price,
  comments,
  batch_order,
  order_status,
  client,
}: OrderType) => {
  const { mutate: deleteOrder, isLoading: isDeleteOrderLoading } =
    useDeleteOrderMutation(() => onSuccess('Zamówienie zostało usunięte'));

  const deleteHandler = () => {
    const id_pallet = id_order;
    if (id_pallet && typeof Number(id_pallet) === 'number') {
      deleteOrder(id_pallet);
    }
  };

  return (
    <div className="my-2 px-2 py-3 border rounded-4 border-shadow col-3 mx-1">
      <div className="d-flex col-12 justify-content-start align-items-center col-6 mb-2 position-relative">
        <div className="position-absolute top-0 end-0">
          <Button
            name="delete-pallet"
            className="button-orange-first bg-danger square-30 mx-1"
            onClick={() => {
              console.log('click');
              deleteHandler();
            }}
            disabled={isDeleteOrderLoading}
          >
            <FontAwesomeIcon
              className="font-xs"
              icon={faTrashCan}
            ></FontAwesomeIcon>
          </Button>
        </div>

        {batch_order.map(batches_order => (
          <BatchImageCard
            key={batches_order.id_batch}
            batch_name={batches_order.batch.batch_name}
            image={batches_order.batch.product.image}
            product_name={batches_order.batch.product.product_name}
          />
        ))}
      </div>
      <div className="d-flex justify-content-between flex-wrap aling-items-center">
        <span className="font-12 text-nowrap">id_order: {id_order}</span>
        <span className="font-12 text-nowrap">order_date: {order_date}</span>
        <span className="font-12 text-nowrap">order_price: {order_price}</span>
        {/* <span className="font-12 text-nowrap">ASIN: {batch_order?.[0].}</span> */}
        <span className="font-12 text-nowrap">comments: {comments || ''}</span>
        <span className="font-12 text-nowrap">
          ASIN: {order_status[0].id_order_status}
        </span>
        <span className="font-12 text-nowrap">
          client_name: {client.client_name}
        </span>
      </div>
      <div>{/* <span className="font-m text">{product_name}</span> */}</div>

      <div className="d-flex flex-wrap h-auto">
        {/* <span className="font-xs">{description}</span> */}
      </div>
    </div>
  );
};

export default OrderCard;
