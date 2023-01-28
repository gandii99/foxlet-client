import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PalletCard from './PalletCard';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useGetMyPalletsQuery } from '../../../hooks/query/assortment';
import ModalWrapper from '../../ModalWrapper';
import PalletCreate from './PalletCreate';

const PalletView = () => {
  const { data: myPallets, isSuccess } = useGetMyPalletsQuery();
  const [modalActive, setModalActive] = useState(false);

  const handleCloseModal = () => {
    setModalActive(!modalActive);
  };

  if (!isSuccess) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-start align-items-center col-12 mb-4">
        <h2 className="mb-0">Palety</h2>
        <Button
          name="create-palet"
          className="button-orange-first button-add-size mx-3 font-m "
          onClick={handleCloseModal}
        >
          <FontAwesomeIcon icon={faPlus} className=" account-icon" />
        </Button>
      </div>

      {myPallets.length === 0 ? (
        <span>Aktualnie nie posiadasz jeszcze żadnych palet...</span>
      ) : (
        <div className="d-flex flex-wrap flex-grow justify-content-start align-items-start">
          {myPallets.map(pallet => {
            console.log(pallet.id_pallet);
            return <PalletCard key={pallet.id_pallet} {...pallet} />;
          })}
        </div>
      )}

      {modalActive && (
        <ModalWrapper
          title={'Dodaj paletę'}
          handleCloseModal={handleCloseModal}
        >
          <PalletCreate handleCloseModal={handleCloseModal} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default PalletView;
