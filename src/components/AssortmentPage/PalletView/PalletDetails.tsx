import { faPlus, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetPalletQuery } from '../../../hooks/query/batches';
import { useAuth } from '../../../hooks/use-auth';
import ModalWrapper from '../../ModalWrapper';
import BatchAdd from './BatchCreate';
import BatchProductCard from './BatchCard';
import InputEdit from './InputEdit';

interface PalletDetailsType {
  pallet_name: string;
  id_supplier: number;
  purchase_price: number;
  purchase_date: string;
  delivery_date: string;
}

const PalletDetails = () => {
  const { id_pallet } = useParams();

  const { data: currentPallets, isSuccess } = useGetPalletQuery([
    Number(id_pallet),
  ]);

  console.log(currentPallets);

  const [editActive, setEditActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [formsValues, setFormsValues] = useState<PalletDetailsType | null>(
    null
  );

  useEffect(() => {
    if (!isSuccess) return;
    const currentPallet = currentPallets[0];

    setFormsValues({
      ...currentPallet,
      id_supplier: currentPallet.supplier.id_supplier,
      purchase_date: dayjs(new Date(currentPallet.purchase_date)).format(
        'YYYY-MM-DD[T]HH:mm:ss'
      ),
      delivery_date: dayjs(new Date(currentPallet.delivery_date)).format(
        'YYYY-MM-DD[T]HH:mm:ss'
      ),
    });
  }, [isSuccess, currentPallets]);

  if (!isSuccess || !formsValues) {
    return <>Loading</>;
  }
  const currentPallet = currentPallets[0];
  const updateFormValues = (name: string, value: string | number) => {
    setFormsValues({
      ...formsValues,
      [name]: value,
    });
  };

  const handleCloseModal = () => {
    setModalActive(!modalActive);
  };

  if (!id_pallet && typeof Number(id_pallet) !== 'number') {
    return <>Błąd. Brak id palety!</>;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('booom');

    if (editActive) {
      // const test = await assortmentAPI.updatePallet(
      //   {
      //     ...formsValues,
      //     purchase_date: formsValues.purchase_date,
      //   }
      // );
    }
    setEditActive(!editActive);
    console.log(e);
  };

  return (
    <div>
      <form className="my-4" onSubmit={e => onSubmit(e)}>
        <div className="d-flex flex-wrap justify-content-start align-items-center col-12 mb-2">
          <h2 className="mb-0">Szczegóły</h2>
          <Button
            className="button-orange-first button-add-size mx-3 font-m "
            type="submit"
          >
            <FontAwesomeIcon
              icon={editActive ? faSave : faEdit}
              className="account-icon "
            />
          </Button>
        </div>
        <div className="d-flex flex-wrap">
          <div className="d-flex col-6">
            <InputEdit
              editActive={editActive}
              id_pallet={currentPallet.id_pallet}
              title="Nazwa"
              type="text"
              key="pallet_name"
              id="pallet_name"
              // value={currentPallet.pallet_name || ''}
              value={formsValues['pallet_name']}
              onChangeHandler={updateFormValues}
            />
          </div>
          <div className="d-flex col-6 justify-content-between">
            <InputEdit
              editActive={editActive}
              id_pallet={currentPallet.id_pallet}
              title="Cena zakupu"
              type="number"
              key="purchase_price"
              id="purchase_price"
              // value={pallet?.purchase_price || 0}
              value={formsValues['purchase_price']}
              onChangeHandler={updateFormValues}
            />
          </div>
          <div className="d-flex col-6">
            <InputEdit
              editActive={editActive}
              id_pallet={currentPallet.id_pallet}
              title="Data zakupu"
              type="datetime-local"
              key="purchase_date"
              id="purchase_date"
              // value={pallet?.purchase_date?.split('.')[0] || '0'}
              value={formsValues['purchase_date']}
              onChangeHandler={updateFormValues}
            />
          </div>
          <div className="d-flex col-6">
            <InputEdit
              editActive={editActive}
              id_pallet={currentPallet.id_pallet}
              title="Data dostawy"
              type="datetime-local"
              key="delivery_date"
              id="delivery_date"
              // value={pallet?.delivery_date?.split('.')[0] || '0'}
              value={formsValues['delivery_date']}
              onChangeHandler={updateFormValues}
            />
          </div>
        </div>
      </form>

      <div className="d-flex flex-wrap my-4">
        <div className="d-flex flex-wrap justify-content-start align-items-center col-12">
          <h2 className="mb-0">Partie produktów </h2>
          <Button
            className="button-orange-first button-add-size mx-3 font-m "
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon={faPlus} className=" account-icon" />
          </Button>
        </div>

        {currentPallet?.batch?.map((batch, index) => (
          <BatchProductCard key={index} {...batch} />
        ))}
      </div>
      {modalActive && (
        <ModalWrapper
          title={'Dodaj partię'}
          handleCloseModal={handleCloseModal}
        >
          <BatchAdd
            id_pallet={Number(id_pallet)}
            handleCloseModal={handleCloseModal}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default PalletDetails;
