import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import assortmentAPI from '../../../services/assortment';
import ModalWrapper from '../../ModalWrapper';
import SupplierCard from './SupplierCard';
import SupplierForm from './SupplierForm';
import { SupplierCardType } from './types';

const SupplierView = () => {
  const { session } = useAuth();
  const [suppliers, setSuppliers] = useState<SupplierCardType[]>([]);
  const [modalActive, setModalActive] = useState(false);

  const handleCloseModal = () => {
    setModalActive(!modalActive);
  };

  useEffect(() => {
    if (session?.user.id_user) {
      const userData = assortmentAPI
        .getMySuppliers()
        .then(response => {
          console.log(response.data);
          setSuppliers(response.data);
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(userData);
    }
  }, []);

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-start align-items-center col-12 mb-4">
        <h2>Twoi dostawcy</h2>
        <Button
          name="create-palet"
          className="button-orange-first button-add-size mx-3 font-m "
          onClick={handleCloseModal}
        >
          <FontAwesomeIcon icon={faPlus} className=" account-icon" />
        </Button>
      </div>
      {(suppliers.length <= 0 && (
        <span>Aktualnie nie dodałeś jeszcze żadnego sprzedawcy...</span>
      )) || (
        <div className="d-flex">
          {suppliers.map(supplier => (
            <SupplierCard
              key={supplier.NIP}
              supplier_name={supplier.supplier_name}
              NIP={supplier.NIP}
              id_supplier={Number(supplier.id_supplier)}
            />
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
