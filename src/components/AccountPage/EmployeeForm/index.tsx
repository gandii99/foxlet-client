import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { useForm } from 'react-hook-form';
import InputText from '../../InputText';
import InputNumber from '../../InputNumber';
import { useGetMyEmployeeProfileQuery } from '../../../hooks/query/account';
import {
  useCreateEmployeeProfileMutation,
  useUpdateMyEmployeeProfileMutation,
} from '../../../hooks/mutation/account';
import { onSuccess } from '../../../lib/toastHelpers';

const EmployeeUpdateSchema = z.object({
  id_company: z.number().optional(),
  // id_user: z.number().optional(),
  first_name: z
    .string()
    .min(1, { message: 'nazwa EmployeeUpdateSchema' })
    .optional(),
  last_name: z.string().min(1, { message: 'lastName is required' }).optional(),
  PESEL: z.string().length(11, { message: 'PESEL is invalid' }).optional(),
  phone: z.preprocess(
    val => (val ? val : null),
    z
      .string()
      .min(9, { message: 'Phone number is too short' })
      .max(12, { message: 'Phone number is too long' })
      .nullable()
  ),
  email: z.string().email().min(5),
  country: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
});

export type typeUpdateEmployee = z.infer<typeof EmployeeUpdateSchema>;

const EmployeeForm = () => {
  const { data: myEmployeeProfile, isSuccess: isGetMyEmployeeProfileSuccess } =
    useGetMyEmployeeProfileQuery();
  const {
    mutate: createMyEmployeeProfile,
    isLoading: isCreateMyEmployeeProfileLoading,
  } = useCreateEmployeeProfileMutation(() =>
    onSuccess('Profil pracownika został utworzony')
  );

  const {
    mutate: updateMyEmployeeProfile,
    isLoading: isUpdateMyEmployeeProfileLoading,
  } = useUpdateMyEmployeeProfileMutation(() =>
    onSuccess('Profil pracownika został zaktualizowany')
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typeUpdateEmployee>({
    resolver: zodResolver(EmployeeUpdateSchema),
  });

  const { session } = useAuth();

  useEffect(() => {
    if (session?.user.id_user) {
      if (myEmployeeProfile) {
        console.log('istnieje', myEmployeeProfile);
        reset(myEmployeeProfile);
      }
    }
  }, [myEmployeeProfile, reset, session?.user.id_user]);

  const onSubmit = (data: typeUpdateEmployee) => {
    if (myEmployeeProfile) {
      updateMyEmployeeProfile({
        ...data,
        phone: data.phone || '',
        id_company: undefined,
      });
    }
  };

  if (!isGetMyEmployeeProfileSuccess) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Pracownik</h2>
      <form
        className="d-flex flex-wrap justify-content-around"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          label="PESEL"
          placeholder={99523165784}
          name="PESEL"
          register={register('PESEL')}
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
          name="update-employee"
          type="submit"
          className="w-100 mt-4 button-orange-first"
          disabled={
            isUpdateMyEmployeeProfileLoading || isCreateMyEmployeeProfileLoading
          }
        >
          {myEmployeeProfile ? 'Aktualizuj' : 'Stwórz profil pracownika'}
        </Button>
      </form>
    </div>
  );
};

export default EmployeeForm;
