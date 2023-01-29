import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { onSuccess } from '../../../lib/toastHelpers';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import InputText from '../../InputText';
import InputNumber from '../../InputNumber';
import { useCreateMyCompanyMutation } from '../../../hooks/mutation/account';

const CompanyCreateSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  company_name: z.string().min(1),
  NIP: z.string(),
  REGON: z.string(),
  phone: z.string(),
  email: z.string(),
  country: z.string(),
  province: z.string(),
  postal_code: z.string(),
  city: z.string(),
  street: z.string(),
});

type typeCompanyCreate = z.infer<typeof CompanyCreateSchema>;

type CompanyCreateProps = { handleCloseModal: () => void };

const CompanyCreate = ({ handleCloseModal }: CompanyCreateProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typeCompanyCreate>({
    resolver: zodResolver(CompanyCreateSchema),
  });

  const { mutate: createCompany, isLoading: isCreateCompanyLoading } =
    useCreateMyCompanyMutation(() => {
      handleCloseModal();
      onSuccess('Firma została utworzona');
    });

  const onSubmit = (data: typeCompanyCreate) => {
    createCompany(data);
  };

  return (
    <form
      className="d-flex flex-wrap justify-content-around"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputText
        label="Nazwa"
        placeholder="Foxlet"
        name="company_name"
        register={register('company_name')}
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
        disabled={isCreateCompanyLoading}
        className="col-11 mt-4 button-orange-first"
      >
        Dodaj
      </Button>
    </form>
  );
};

export default CompanyCreate;
