import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useGetMySuppliersQuery } from '../../../hooks/query/assortment';
import { useAuth } from '../../../hooks/use-auth';
import assortmentAPI from '../../../services/assortment';
import ModalWrapper from '../../ModalWrapper';
import SupplierCard from './SupplierCard';
import SupplierForm from './SupplierForm';
import { SupplierCardType } from './types';

const SupplierView = () => {
  const { data: mySuppliers, isSuccess: isGetMySuppliersSuccess } =
    useGetMySuppliersQuery();
  const [modalActive, setModalActive] = useState(false);

  const handleCloseModal = () => {
    setModalActive(!modalActive);
  };

  if (!isGetMySuppliersSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-center col-12 mb-4">
        <h2>Dostawcy</h2>
        <Button
          name="create-palet"
          className="button-orange-first button-add-size mx-3 font-m "
          onClick={handleCloseModal}
        >
          <FontAwesomeIcon icon={faPlus} className=" account-icon" />
        </Button>
      </div>
      {(mySuppliers.length <= 0 && (
        <span>Nie dodałeś jeszcze żadnego dostawcy...</span>
      )) || (
        <div className="d-flex flex-wrap justify-content-center justify-content-md-start col-12">
          {mySuppliers.map(supplier => (
            <SupplierCard key={supplier.id_supplier} {...supplier} />
          ))}
        </div>
      )}
      {modalActive && (
        <ModalWrapper
          title={'Dodaj dostawcę'}
          handleCloseModal={handleCloseModal}
        >
          <SupplierForm handleCloseModal={handleCloseModal} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default SupplierView;
