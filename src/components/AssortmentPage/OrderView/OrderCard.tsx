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
  const [showMore, setShowMore] = useState(false);
  const { mutate: deleteOrder, isLoading: isDeleteOrderLoading } =
    useDeleteOrderMutation(() => onSuccess('Zamówienie zostało usunięte'));

  const deleteHandler = () => {
    const id_pallet = id_order;
    if (id_pallet && typeof Number(id_pallet) === 'number') {
      deleteOrder(id_pallet);
    }
  };

  return (
    <div className="my-2 px-2 py-3 border rounded-4 border-shadow col-3 mx-1 ">
      <div className="d-flex flex-wrap col-12 justify-content-start align-items-center col-6 mb-2 position-relative">
        <div>
          <div>Partia: {id_order}</div>

          <div className="d-flex justify-content-between flex-wrap aling-items-center">
            <span className="font-12 text-nowrap">EAN: {order_date}</span>
            <span className="font-12 text-nowrap">ASIN: {order_price}</span>
          </div>
          <div>
            <span className="font-m text">{comments}</span>
          </div>
          <div className="d-flex justify-content-between flex-wrap aling-items-center">
            <span className="font-s text">
              W magazynie: {batch_order[0].id_batch}
            </span>
            <span className="font-s text">
              Cena: {order_status[0].id_employee}
            </span>
          </div>
          <div className="d-flex flex-wrap h-auto">
            <p className="font-xs mb-0 ">
              {showMore
                ? comments
                : `${comments && comments.substring(0, 38)}... `}
              <span
                className="font-xs border rounded-3 px-1"
                role="button"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Ukryj' : 'Więcej'}
              </span>
            </p>
          </div>
        </div>
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
      </div>

      <div className="d-flex flex-wrap col-12 justify-content-start align-items-center col-6 mb-2">
        {batch_order.map(batches_order => (
          <BatchImageCard
            key={batches_order.id_batch}
            batch_name={batches_order.batch.batch_name}
            image={batches_order.batch.product.image}
            product_name={batches_order.batch.product.product_name}
            id_condition={batches_order.batch.condition.id_condition}
          />
        ))}
      </div>

      <div className="d-flex flex-wrap h-auto">
        {/* <span className="font-xs">{description}</span> */}
      </div>
    </div>
  );
};

export default OrderCard;
