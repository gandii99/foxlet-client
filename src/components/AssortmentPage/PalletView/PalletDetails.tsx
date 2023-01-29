import { faPlus, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetPalletQuery } from '../../../hooks/query/batches';
import { useAuth } from '../../../hooks/use-auth';
import ModalWrapper from '../../ModalWrapper';
import BatchCreate from './BatchCreate';
import BatchProductCard from './BatchCard';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { useForm } from 'react-hook-form';
import assortmentAPI from '../../../services/assortment';
import InputText from '../../InputText';
import InputNumber from '../../InputNumber';
import InputDate from '../../InputDate';
import { SupplierCardType } from '../SupplierView/types';
import { onSuccess } from '../../../lib/toastHelpers';
import { useGetMySuppliersQuery } from '../../../hooks/query/assortment';

const PalletsSchema = z.object({
  id_supplier: z.preprocess(val => val && Number(val), z.number()),
  pallet_name: z.string().optional(),
  purchase_price: z.preprocess(val => val && Number(val), z.number()),
  purchase_date: z.string().min(1),
  delivery_date: z.string().min(1),
});

export type typePallet = z.infer<typeof PalletsSchema>;

const PalletDetails = () => {
  const { id_pallet } = useParams();
  const { session } = useAuth();

  const { data: currentPallets, isSuccess } = useGetPalletQuery([
    Number(id_pallet),
  ]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typePallet>({
    resolver: zodResolver(PalletsSchema),
  });

  const { data: mySuppliers, isSuccess: isGetMySuppliersSuccess } =
    useGetMySuppliersQuery();

  const [editActive, setEditActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    if (!isSuccess) return;
    const currentPallet = currentPallets[0];
    console.log(currentPallet);
    if (currentPallet) {
      reset({
        ...currentPallet,
        id_supplier: currentPallet.supplier.id_supplier,
        purchase_date: dayjs(new Date(currentPallet.purchase_date)).format(
          'YYYY-MM-DD[T]HH:mm'
        ),
        delivery_date: dayjs(new Date(currentPallet.delivery_date)).format(
          'YYYY-MM-DD[T]HH:mm'
        ),
      });
    }
  }, [isSuccess, currentPallets, reset]);

  if (!isSuccess) {
    return <>Loading</>;
  }
  const currentPallet = currentPallets[0];

  const handleCloseModal = () => {
    setModalActive(!modalActive);
  };

  if (!id_pallet && typeof Number(id_pallet) !== 'number') {
    return <>Błąd. Brak id palety!</>;
  }

  const onSubmit = async (data: typePallet) => {
    if (editActive) {
      console.log('onSubmit');
      assortmentAPI.updatePallet(Number(id_pallet), data, onSuccess);
    }
    setEditActive(!editActive);
  };

  return (
    <div>
      <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="d-flex flex-wrap justify-content-between">
          <InputText
            label="Nazwa"
            placeholder="Konsole retro"
            name="pallet_name"
            register={register('pallet_name')}
            classLabel="font-xs col-4 mt-3"
            classInput="form-control"
            classError="font-13 text-danger"
            errors={errors}
            disabled={!editActive}
          />
          <InputNumber
            label="Cena"
            placeholder={45}
            name="purchase_price"
            register={register('purchase_price')}
            classLabel="font-xs col-4 mt-3 px-4"
            classInput="form-control"
            classError="font-13 text-danger"
            errors={errors}
            disabled={!editActive}
          />

          <label className="font-xs col-4 mt-3">
            Dostawca
            <select
              className="form-control"
              {...register('id_supplier')}
              disabled={!editActive}
            >
              <option value="">Wybierz</option>
              {isGetMySuppliersSuccess &&
                mySuppliers.map(supplier => (
                  <option
                    key={supplier.id_supplier}
                    value={Number(supplier.id_supplier)}
                  >
                    {supplier.supplier_name}
                  </option>
                ))}
            </select>
            {errors.id_supplier && (
              <span className="font-13 text-danger">
                {errors.id_supplier.message}
              </span>
            )}
          </label>

          <InputDate
            label="Data zakupu"
            placeholder={new Date().toISOString().split('.')[0]}
            name="purchase_date"
            register={register('purchase_date')}
            classLabel="font-xs col-5 mt-3 "
            classInput="form-control"
            classError="font-13 text-danger"
            errors={errors}
            disabled={!editActive}
          />

          <InputDate
            label="Data dostawy"
            placeholder={new Date().toISOString().split('.')[0]}
            name="delivery_date"
            register={register('delivery_date')}
            classLabel="font-xs col-5 mt-3"
            classInput="form-control"
            classError="font-13 text-danger"
            errors={errors}
            disabled={!editActive}
          />
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
        <div className="d-flex flex-wrap justify-content-start col-12">
          {currentPallet?.batch?.map((batch, index) => (
            <BatchProductCard key={index} {...batch} />
          ))}
        </div>
      </div>
      {modalActive && (
        <ModalWrapper
          title={'Dodaj partię'}
          handleCloseModal={handleCloseModal}
        >
          <BatchCreate
            id_pallet={Number(id_pallet)}
            handleCloseModal={handleCloseModal}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default PalletDetails;
