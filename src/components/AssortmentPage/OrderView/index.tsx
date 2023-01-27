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
} from '../../../services/assortment';
import OrderCard from './OrderCard';
import { useGetMyOrdersQuery } from '../../../hooks/query/assortment';

const OrderView = () => {
  // const [orders, setOrders] = useState<OrderType[]>([]);

  const { data: myOrders, isSuccess: isGetMyOrdersSuccess } =
    useGetMyOrdersQuery();

  if (!isGetMyOrdersSuccess) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Twoje zamówienia</h2>
      <div className="d-flex flex-wrap justify-content-start">
        {myOrders.map(order => (
          <OrderCard key={order.id_order} {...order} />
        ))}
      </div>
    </div>
  );
};

export default OrderView;
