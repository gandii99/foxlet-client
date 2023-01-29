import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useGetMyClientsQuery } from '../../../hooks/query/assortment';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';
import assortmentAPI from '../../../services/assortment';
import ModalWrapper from '../../ModalWrapper';
import ClientCard from './ClientCard';
import ClientForm from './ClientForm';

export interface ClientType {
  id_client: number;
  id_user: number;
  id_employee: string;
  first_name: string;
  last_name: string;
  client_name: string;
  NIP: string;
  REGON: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

const ClientView = () => {
  const [modalActive, setModalActive] = useState(false);

  const handleCloseModal = () => {
    setModalActive(!modalActive);
  };

  const { data: myClients, isSuccess: isGetMyClientsSuccess } =
    useGetMyClientsQuery();

  if (!isGetMyClientsSuccess) {
    return <div>Loading</div>;
  }
  console.log(myClients);
  console.log(myClients && myClients.length > 0);
  console.log(myClients);

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-center col-12 mb-4">
        <h2>Klienci</h2>
        <Button
          name="create-palet"
          className="button-orange-first button-add-size mx-3 font-m "
          onClick={handleCloseModal}
        >
          <FontAwesomeIcon icon={faPlus} className=" account-icon" />
        </Button>
      </div>
      <div className="d-flex flex-wrap justify-content-start">
        {(!myClients || myClients.length) <= 0 ? (
          <span>Aktualnie nie dodałeś jeszcze żadnych klientów...</span>
        ) : (
          <>
            {myClients &&
              myClients.length > 0 &&
              myClients.map(client => (
                <ClientCard key={client.id_client} {...client} />
              ))}
          </>
        )}
      </div>
      {modalActive && (
        <ModalWrapper
          title={'Dodaj klienta'}
          handleCloseModal={handleCloseModal}
        >
          <ClientForm handleCloseModal={handleCloseModal} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default ClientView;
