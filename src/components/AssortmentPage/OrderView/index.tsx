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
import assortmentAPI, {
  CategoryType,
  OrderType,
  StatusType,
} from '../../../services/assortment';
import OrderCard from './OrderCard';
import { useGetMyOrdersQuery } from '../../../hooks/query/assortment';

const OrderView = () => {
  const [statuses, setStatuses] = useState<StatusType[]>([]);

  const { data: myOrders, isSuccess: isGetMyOrdersSuccess } =
    useGetMyOrdersQuery();

  useEffect(() => {
    assortmentAPI.getAllStatuses().then(response => {
      setStatuses(response);
    });
  }, []);

  if (!isGetMyOrdersSuccess) {
    return <div>Loading</div>;
  }

  return (
    <div className="">
      <h2 className="col-12 px-3 d-flex justify-content-center justify-content-md-start">
        Zamówienia
      </h2>
      <div className="d-flex flex-wrap justify-content-center justify-content-lg-start col-12">
        {myOrders.map(order => (
          <OrderCard key={order.id_order} {...order} statuses={statuses} />
        ))}
      </div>
    </div>
  );
};

export default OrderView;
