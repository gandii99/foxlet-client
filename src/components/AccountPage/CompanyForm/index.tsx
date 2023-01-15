import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { useForm } from 'react-hook-form';
import { useGetMyCompanyProfileQuery } from '../../../hooks/query/account';
import {
  useCreateMyCompanyProfileMutation,
  useUpdateMyCompanyProfileMutation,
} from '../../../hooks/mutation/account';
import { onSuccess } from '../../../lib/toastHelpers';
import InputText from '../../InputText';
import InputNumber from '../../InputNumber';

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

const CompanyUpdateSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company_name: z.string().min(1).optional(),
  NIP: z.string().optional(),
  REGON: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
});

type typeCompanyUpdate = z.infer<typeof CompanyUpdateSchema>;

const CompanyForm = () => {
  const { session } = useAuth();
  const [currentSchema, setCurrentSchema] = useState<
    typeof CompanyCreateSchema | typeof CompanyUpdateSchema
  >(CompanyCreateSchema);

  const { data: myCompanyProfile, isSuccess: isGetMyCompanyProfileSuccess } =
    useGetMyCompanyProfileQuery();

  const {
    mutate: createMyCompanyProfile,
    isLoading: isCreateMyCompanyProfileLoading,
  } = useCreateMyCompanyProfileMutation(() =>
    onSuccess('Profil firmy został utworzony')
  );

  const {
    mutate: updateMyCompanyProfile,
    isLoading: isUpdateMyCompanyProfileLoading,
  } = useUpdateMyCompanyProfileMutation(() =>
    onSuccess('Profil firmy został zaktualizowany')
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typeCompanyCreate | typeCompanyUpdate>({
    resolver: zodResolver(currentSchema),
  });

  useEffect(() => {
    if (session?.user.id_user) {
      if (myCompanyProfile) {
        console.log('istnieje', myCompanyProfile);
        setCurrentSchema(CompanyUpdateSchema);
        reset(myCompanyProfile);
      } else {
        console.log('nie istnieje', myCompanyProfile);
        setCurrentSchema(CompanyCreateSchema);
        reset({});
      }
    }
  }, [myCompanyProfile, reset, session?.user.id_user]);

  const onSubmit = (data: typeCompanyCreate | typeCompanyUpdate) => {
    if (!myCompanyProfile) {
      createMyCompanyProfile(data as typeCompanyCreate);
    }
    if (myCompanyProfile) {
      updateMyCompanyProfile(data);
    }
  };

  if (!isGetMyCompanyProfileSuccess) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Firma</h2>
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
          className="w-100 mt-4 button-orange-first"
          disabled={
            isCreateMyCompanyProfileLoading || isUpdateMyCompanyProfileLoading
          }
        >
          {myCompanyProfile ? 'Aktualizuj' : 'Utwórz konto firmy'}
        </Button>
      </form>
    </div>
  );
};

export default CompanyForm;
