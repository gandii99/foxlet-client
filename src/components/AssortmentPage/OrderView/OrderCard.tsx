import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  useDeleteOrderMutation,
  useUpdateStatusMutation,
} from '../../../hooks/mutation/assortment';
import { onError, onSuccess } from '../../../lib/toastHelpers';
import assortmentAPI, {
  BatchOrderType,
  OrderStatusType,
  OrderType,
  StatusType,
} from '../../../services/assortment';
import DescriptionMore from '../../DescriptionMore';
import { ClientType } from '../ClientsView';
import BatchImageCard from '../PalletView/BatchImageCard';
import { ProductType } from '../PalletView/types';

interface OrderCardPropsType {
  id_order: number;
  order_date: string;
  order_price: number;
  comments: string;
  batch_order: BatchOrderType[];
  order_status: OrderStatusType[];
  client: ClientType;
  statuses: StatusType[];
}

const OrderCard = ({
  id_order,
  order_date,
  order_price,
  comments,
  batch_order,
  order_status,
  client,
  statuses,
}: OrderCardPropsType) => {
  // const { data: orderStatus, isSuccess: isOrderStatusSuccess } =
  //   useGetStatusQuery(id_order);
  // console.log(orderStatus);

  const [currentStatus, setCurrentStatus] = useState<number>(
    order_status[0].id_status
  );

  const { mutate: updateStatus, isLoading: isUpdateStatusLoading } =
    useUpdateStatusMutation(() => onSuccess('Status został zaktualizowany'));

  const { mutate: deleteOrder, isLoading: isDeleteOrderLoading } =
    useDeleteOrderMutation(() => onSuccess('Zamówienie zostało usunięte'));

  const deleteHandler = () => {
    const id_pallet = id_order;
    if (id_pallet && typeof Number(id_pallet) === 'number') {
      deleteOrder(id_pallet);
    }
  };

  const changeStatusHandler = (statusId: number) => {
    console.log('currentStatus', currentStatus);
    updateStatus({
      id_status: statusId,
      id_order: id_order,
      comments: '',
    });
  };

  return (
    <div className="d-flex justify-content-between col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 px-1 px-lg-2">
      <div className="my-2 p-3 border rounded-4 border-shadow col-12">
        <div className="d-flex flex-wrap col-12 mb-2 position-relative">
          <div className="d-flex justify-content-center col-12">
            Cena:&nbsp;<span className="fw-bold">{order_price.toFixed(2)}</span>
            &nbsp;zł
          </div>
          {(client.first_name || client.last_name || client.client_name) && (
            <div className="lh-1 col-12 col-md-9 col-lg-6 px-1">
              <span className="font-14 text-muted">Klient:</span>

              <div className="font-16 mt-1">
                {client.first_name} {client.last_name}
              </div>
              <div className="font-16 mt-1">{client.client_name}</div>
              <div className="font-16 text-wrap mt-1">{client.phone}</div>
              <div className="font-16 text-wrap text-break ">
                {client.email}
              </div>
            </div>
          )}
          {/* {(client.first_name || client.last_name) && (
            <div className="lh-1 col-12 col-md-9 col-lg-6 px-1">
              <span className="font-14 text-muted">Klient:</span>
              <div className="font-18 mt-1">
                {client.first_name} {client.last_name}
              </div>
            </div>
          )} */}

          {/* {(client.phone || client.email) && (
            <div className="my-2 lh-1 col-12 col-md-9 col-lg-6 px-1">
              <span className="font-14 text-muted">Kontakt:</span>
              <div className="font-18 text-wrap mt-1">{client.phone}</div>
              <div className="font-16 text-wrap text-break ">
                {client.email}
              </div>
            </div>
          )} */}

          {(client.REGON || client.NIP) && (
            <div className="lh-1 col-12 col-md-9 col-lg-6 px-1 my-2">
              <span className="font-14 text-muted">
                {client.REGON ? 'REGON' : 'NIP'}
              </span>
              <div className="font-18 mt-1">{client.REGON || client.NIP}</div>
            </div>
          )}
          {(client.postal_code || client.city) && (
            <div className="my-2 lh-1 col-12 col-md-9 col-lg-6 px-1">
              <span className="font-14 text-muted">Adres:</span>
              <div className="font-16 mt-1">
                {client.postal_code} {client.city}
              </div>
              <div className="font-16">
                {client.street}, {client.country}
              </div>
            </div>
          )}

          <div className="lh-1 col-12 col-md-9 col-lg-6 px-1 my-2">
            {/* <span className="font-14 text-muted">{REGON ? 'REGON' : 'NIP'}</span> */}
            <div className="font-14">
              <label className="text-muted font-14">
                Status
                <select
                  className="form-control font-18"
                  value={currentStatus}
                  onChange={e => {
                    setCurrentStatus(Number(e.target.value));
                    changeStatusHandler(Number(e.target.value));
                  }}
                  disabled={isUpdateStatusLoading}
                  // onChange={() => changeStatusHandler()}
                >
                  <option value="">Wybierz</option>
                  {statuses.map(status => (
                    <option key={status.id_status} value={status.id_status}>
                      {status.status_name}
                    </option>
                  ))}
                </select>
                {/* {errors.id_condition && (
                  <span className="font-13 text-danger">
                    {errors.id_condition.message}
                  </span>
                )} */}
              </label>
            </div>
          </div>

          <div className="position-absolute top-0 end-0">
            <Button
              name="delete-pallet"
              className="button-orange-first square-30 mx-1"
              onClick={() => {
                console.log('click');
                deleteHandler();
              }}
              disabled={isDeleteOrderLoading}
            >
              <FontAwesomeIcon
                className="font-18"
                icon={faTrashCan}
              ></FontAwesomeIcon>
            </Button>
          </div>
        </div>
        <div className="d-flex flex-wrap col-12 justify-content-start align-items-center">
          {batch_order.map(batches_order => (
            <div
              className="d-flex flex-wrap col-12 justify-content-between align-items-center"
              key={batches_order.id_batch}
            >
              <BatchImageCard
                key={batches_order.id_batch}
                batch_name={batches_order.batch.batch_name}
                image={batches_order.batch.product.image}
                product_name={batches_order.batch.product.product_name}
                id_condition={batches_order.batch.condition.id_condition}
              />
              <div className="d-flex flex-column align-items-start flex-grow-1 text-muted">
                <span className="font-14">
                  {batches_order.quantity_in_order} Szt.
                </span>
                <span className="font-14">
                  {batches_order.batch.product.product_name}
                </span>
              </div>
              <div className="d-flex flex-column text-muted">
                <span className="font-14">
                  {(
                    batches_order.batch.selling_price *
                    batches_order.quantity_in_order
                  ).toFixed(2)}{' '}
                  zł
                </span>
                <span className="font-14">
                  {batches_order.batch.selling_price.toFixed(2)} zł
                </span>
              </div>

              {/* <div>{batches_order.batch.product.product_name}</div> */}
            </div>
          ))}
        </div>

        <div className="d-flex flex-wrap h-auto">
          {/* <span className="font-xs">{description}</span> */}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
