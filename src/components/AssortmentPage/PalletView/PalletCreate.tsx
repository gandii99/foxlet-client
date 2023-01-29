import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import assortmentAPI from '../../../services/assortment';
import { SupplierCardType } from '../SupplierView/types';
import { useCreatePalletsMutation } from '../../../hooks/mutation/assortment';
import { onSuccess } from '../../../lib/toastHelpers';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import InputText from '../../InputText';
import InputNumber from '../../InputNumber';
import InputDate from '../../InputDate';
import { useGetMySuppliersQuery } from '../../../hooks/query/assortment';

const PalletSchema = z.object({
  id_supplier: z.preprocess(val => val && Number(val), z.number()),
  pallet_name: z.string().optional(),
  purchase_price: z.preprocess(val => val && Number(val), z.number()),
  purchase_date: z.string().min(1),
  delivery_date: z.string().min(1),
});

type typePallet = z.infer<typeof PalletSchema>;

type PalletCreateProps = { handleCloseModal: () => void };

const PalletCreate = ({ handleCloseModal }: PalletCreateProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typePallet>({
    resolver: zodResolver(PalletSchema),
  });

  const { mutate: createPallet, isLoading: isCreatePalletLoading } =
    useCreatePalletsMutation(() => {
      handleCloseModal(), onSuccess('Paleta została utworzona');
    });
  const { data: mySuppliers, isSuccess: isGetMySuppliersSuccess } =
    useGetMySuppliersQuery();

  const onSubmit = (data: typePallet) => {
    createPallet(data);
  };

  return (
    <form
      className="d-flex flex-wrap justify-content-around"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputText
        label="Nazwa palety"
        placeholder="Konsole"
        name="pallet_name"
        register={register('pallet_name')}
        classLabel="font-xs col-12 col-sm-11 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <label className="font-xs col-12 col-sm-5 mt-3">
        Dostawca
        <select {...register('id_supplier')} className="form-control">
          <option value="">Wybierz</option>
          {isGetMySuppliersSuccess &&
            mySuppliers.map(supplier => (
              <option key={supplier.id_supplier} value={supplier.id_supplier}>
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

      <InputNumber
        label="Cena zakupu"
        placeholder={123}
        name="purchase_price"
        register={register('purchase_price')}
        classLabel="font-xs col-12 col-sm-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputDate
        label="Data zakupu"
        placeholder="Konsole"
        name="purchase_date"
        register={register('purchase_date')}
        classLabel="font-xs col-12 col-sm-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />

      <InputDate
        label="Data dostawy"
        placeholder="Konsole"
        name="delivery_date"
        register={register('delivery_date')}
        classLabel="font-xs col-12 col-sm-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <Button
        type="submit"
        disabled={isCreatePalletLoading}
        className="col-11 mt-4 button-orange-first"
      >
        Dodaj
      </Button>
    </form>
  );
};

export default PalletCreate;
