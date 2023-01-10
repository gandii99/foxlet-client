import { faPlus, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';
import assortmentAPI from '../../../services/assortment';
import ModalWrapper from '../../ModalWrapper';
import { SupplierCardType } from '../SupplierView/types';
import BatchAdd from './BatchAdd';
import BatchProductCard from './BatchProductCard';
import InputEdit from './InputEdit';
import { FieldsType, PalletCardType } from './types';

interface PalletDetailsType {
  pallet_name: string;
  id_supplier: number;
  purchase_price: number;
  purchase_date: string;
  delivery_date: string;
}
// purchase_date: dayjs(response.data[0].purchase_date).format(
//   'DD MMMM YYYY HH:mm'
// ),
// delivery_date: dayjs(response.data[0].delivery_date).format(
//   'DD MMMM YYYY HH:mm'
// ),

const PalletDetails = () => {
  const { session } = useAuth();
  const [pallet, setPallet] = useState<PalletCardType>({});
  const { id_pallet } = useParams();
  const [editActive, setEditActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [formsValues, setFormsValues] = useState<PalletDetailsType | null>(
    null
  );

  console.log(id_pallet);
  console.log(pallet?.pallet_name || 'braddd');
  useEffect(() => {
    if (session?.user.id) {
      const pallets = assortmentAPI
        .getSelectedPalettes([parseInt(id_pallet || '0')])
        .then(response => {
          console.log(response.data[0]);
          setPallet(response.data[0]);
          setFormsValues({
            ...response.data[0],
            purchase_date: dayjs(
              new Date(response.data[0].purchase_date)
            ).format('YYYY-MM-DD[T]HH:mm:ss'),
            delivery_date: dayjs(
              new Date(response.data[0].delivery_date)
            ).format('YYYY-MM-DD[T]HH:mm:ss'),
          });
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(pallets);
      // const suppliersList = assortmentAPI
      //   .getAllSuppliers()
      //   .then(response => {
      //     console.log(response.data);
      //     setSuppliers(response.data);
      //   })
      //   .catch(err => {
      //     console.log('error', err);
      //   });
    }
  }, [id_pallet, session?.user.id]);

  if (!pallet || !formsValues) {
    return <>Loading</>;
  }

  const updateFormValues = (name: string, value: string | number) => {
    setFormsValues({
      ...formsValues,
      [name]: value,
    });
  };

  const handleCloseModal = () => {
    setModalActive(!modalActive);
  };

  return pallet.id_pallet ? (
    <div>
      <form
        className="my-4"
        onSubmit={async e => {
          e.preventDefault();
          console.log('booom');

          if (editActive) {
            console.log('hello, lecimy');
            const test = await assortmentAPI.updatePallet(
              parseInt(id_pallet || '0'),
              {
                ...formsValues,
                purchase_date: formsValues.purchase_date,
              }
            );
            console.log('hello, lecimy nie śpimy', test);
          }
          setEditActive(!editActive);
          console.log(e);
        }}
      >
        <div className="d-flex flex-wrap justify-content-start align-items-center col-12">
          <h2 className="mb-0">Szczegóły</h2>
          <Button
            className="button-orange-first button-add-size mx-3 font-m "
            type="submit"
            // onClick={() => {
            //   ;
            //   console.log('swap kurwa', editActive);
            // }}
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
              id_pallet={pallet.id_pallet}
              title="Nazwa"
              type="text"
              key="pallet_name"
              id="pallet_name"
              // value={pallet?.pallet_name || ''}
              value={formsValues['pallet_name']}
              onChangeHandler={updateFormValues}
              // onChangeHandler={onChangeHandler}
            />
          </div>
          <div className="d-flex col-6 justify-content-between">
            <InputEdit
              editActive={editActive}
              id_pallet={pallet.id_pallet}
              title="Cena zakupu"
              type="number"
              key="purchase_price"
              id="purchase_price"
              // value={pallet?.purchase_price || 0}
              value={formsValues['purchase_price']}
              onChangeHandler={updateFormValues}
              // onChangeHandler={onChangeHandler}
            />
          </div>
          <div className="d-flex col-6">
            <InputEdit
              editActive={editActive}
              id_pallet={pallet.id_pallet}
              title="Data zakupu"
              type="datetime-local"
              key="purchase_date"
              id="purchase_date"
              // value={pallet?.purchase_date?.split('.')[0] || '0'}
              value={formsValues['purchase_date']}
              onChangeHandler={updateFormValues}
              // onChangeHandler={onChangeHandler}
            />
          </div>
          <div className="d-flex col-6">
            <InputEdit
              editActive={editActive}
              id_pallet={pallet.id_pallet}
              title="Data dostawy"
              type="datetime-local"
              key="delivery_date"
              id="delivery_date"
              // value={pallet?.delivery_date?.split('.')[0] || '0'}
              value={formsValues['delivery_date']}
              onChangeHandler={updateFormValues}
              // onChangeHandler={onChangeHandler}
            />
          </div>
        </div>
      </form>

      <div className="d-flex flex-wrap my-4">
        <div className="d-flex flex-wrap justify-content-start align-items-center col-12">
          <h2 className="mb-0">Partie produktów </h2>
          {/* <Link
            className="button-orange-first button-add-size mx-3"
            to="/assortment/add-pallet"
          >
            <FontAwesomeIcon icon={faPlus} className="account-icon w-100" />
          </Link> */}
          <Button
            className="button-orange-first button-add-size mx-3"
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon={faPlus} className=" account-icon w-100" />
          </Button>
        </div>

        {pallet?.batch?.map((batch, index) => (
          <BatchProductCard key={index} {...batch} />
        ))}
      </div>
      {modalActive && (
        <ModalWrapper
          title={'Dodaj partię'}
          handleCloseModal={handleCloseModal}
        >
          {/* <div className={'d- grid grid-cols-[3fr_2fr] gap-5 min-h-[500px] '} /> */}
          <BatchAdd />
        </ModalWrapper>
      )}
    </div>
  ) : (
    <></>
  );
};

export default PalletDetails;
