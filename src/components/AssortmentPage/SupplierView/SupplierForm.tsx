import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { useForm } from 'react-hook-form';
import { onSuccess } from '../../../lib/toastHelpers';
import InputText from '../../InputText';
import InputNumber from '../../InputNumber';
import { useCreateSupplierMutation } from '../../../hooks/mutation/assortment';

const SupplierCreateSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  supplier_name: z.string().optional(),
  NIP: z.string().optional(),
  REGON: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  country: z.string().min(1),
  province: z.string().min(1),
  postal_code: z.string().min(1),
  city: z.string().min(1),
  street: z.string().min(1),
});

type typeSupplierCreate = z.infer<typeof SupplierCreateSchema>;
type SupplierCreateProps = { handleCloseModal: () => void };

const SupplierForm = ({ handleCloseModal }: SupplierCreateProps) => {
  const { session } = useAuth();

  const { mutate: createSupplier, isLoading: isCreateSupplierLoading } =
    useCreateSupplierMutation(() => {
      handleCloseModal();
      onSuccess('Dostawca został utworzony');
    });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typeSupplierCreate>({
    resolver: zodResolver(SupplierCreateSchema),
  });

  const onSubmit = (data: typeSupplierCreate) => {
    createSupplier(data);
  };

  // if (!isGetMySupplierProfileSuccess) {
  //   return <div>Loading</div>;
  // }

  return (
    <form
      className="d-flex flex-wrap justify-content-around"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputText
        label="Nazwa"
        placeholder="Foxlet"
        name="supplier_name"
        register={register('supplier_name')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputNumber
        label="NIP"
        placeholder={6734562398}
        name="NIP"
        register={register('NIP')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputNumber
        label="REGON"
        placeholder={6734562398}
        name="REGON"
        register={register('REGON')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputText
        label="Imię"
        placeholder="Jan"
        name="first_name"
        register={register('first_name')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputText
        label="Nazwisko"
        placeholder="Kowalski"
        name="last_name"
        register={register('last_name')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputText
        label="Email"
        placeholder="jan.kowalski@gmail.com"
        name="email"
        register={register('email')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputNumber
        label="Numer telefonu"
        placeholder={536097236}
        name="phone"
        register={register('phone')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputText
        label="Kraj"
        placeholder="Polska"
        name="country"
        register={register('country')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputText
        label="Województwo"
        placeholder="jan.kowalski@gmail.com"
        name="province"
        register={register('province')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputText
        label="Kod pocztowy"
        placeholder="jan.kowalski@gmail.com"
        name="postal_code"
        register={register('postal_code')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputText
        label="Miasto"
        placeholder="Sandomierz"
        name="city"
        register={register('city')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputText
        label="Ulica"
        placeholder="Ogrodowa 5"
        name="street"
        register={register('street')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <Button
        type="submit"
        className="w-100 mt-4 button-orange-first"
        disabled={isCreateSupplierLoading}
      >
        Dodaj dostawcę
      </Button>
    </form>
  );
};

export default SupplierForm;
