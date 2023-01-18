import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { useForm } from 'react-hook-form';
import {
  useGetMyCompanyProfileQuery,
  useGetMyEmployeeProfileQuery,
} from '../../../hooks/query/account';
import {
  useCreateMyCompanyProfileMutation,
  useUpdateMyCompanyProfileMutation,
} from '../../../hooks/mutation/account';
import { onSuccess } from '../../../lib/toastHelpers';
import InputText from '../../InputText';
import InputNumber from '../../InputNumber';
import api from '../../../lib/api';
import assortmentAPI from '../../../services/assortment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPlus,
  faRepeat,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

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

interface CompanyType {
  id_company: number;
  first_name: string;
  last_name: string;
  company_name: string;
  NIP: string;
  REGON: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

const CompanyForm = () => {
  const { session } = useAuth();
  const [companyFormActive, setCompanyFormActive] = useState<boolean>(false);
  const [companySwitchActive, setCompanySwitchActive] = useState<boolean>(true);
  const [companies, setCompanies] = useState<CompanyType[]>([]);
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
        setCompanyFormActive(true);
        setCurrentSchema(CompanyUpdateSchema);
        reset(myCompanyProfile);
      } else {
        setCompanyFormActive(false);
        console.log('nie istnieje', myCompanyProfile);
        setCurrentSchema(CompanyCreateSchema);
        reset({});
      }
    }
  }, [myCompanyProfile, reset, session?.user.id_user]);

  useEffect(() => {
    if (session?.user.id_user) {
      accountAPI.getAllCompanies().then(response => {
        if (response && response.length > 0) {
          setCompanies(response);
        }
      });
      if (!myCompanyProfile) {
        setCompanyFormActive(false);
      }
    }
  }, [myCompanyProfile, session?.user.id_user]);

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
  console.log(myCompanyProfile);

  return (
    <div>
      <div className="d-flex justify-content-start align-items-center">
        <h2>Firma</h2>
        {myCompanyProfile && (
          <div className="d-flex justify-content-start align-items-center mx-4">
            <label className="d-inline-block font-xs ">
              <select className="form-control" disabled={companySwitchActive}>
                <option key={0} value="" selected>
                  Brak
                </option>
                {companies.map(company => (
                  <option
                    key={company.id_company}
                    value={company.id_company}
                    selected={
                      myCompanyProfile.employee?.[0].id_company ===
                      company.id_company
                    }
                  >
                    {company.company_name}
                  </option>
                ))}
              </select>
            </label>
            {companySwitchActive ? (
              <Button
                className="button-orange-first button-add-size font-m "
                onClick={() => setCompanySwitchActive(!companySwitchActive)}
              >
                <FontAwesomeIcon icon={faRepeat} className=" account-icon" />
              </Button>
            ) : (
              <>
                <Button
                  className="button-orange-first button-add-size font-m "
                  onClick={() => setCompanySwitchActive(!companySwitchActive)}
                >
                  <FontAwesomeIcon icon={faCheck} className=" account-icon" />
                </Button>
                <Button
                  className="button-orange-first button-add-size font-m "
                  onClick={() => setCompanySwitchActive(!companySwitchActive)}
                >
                  <FontAwesomeIcon icon={faXmark} className=" account-icon" />
                </Button>
                <Button
                  className="button-orange-first button-add-size font-m "
                  onClick={() => setCompanySwitchActive(!companySwitchActive)}
                >
                  <FontAwesomeIcon icon={faTrash} className=" account-icon" />
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {!myCompanyProfile && (
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <span>Mam własną firmę</span>
            <Button
              className=" button-orange-first button-add-size mx-3 font-m "
              onClick={() => setCompanyFormActive(!companyFormActive)}
            >
              <FontAwesomeIcon icon={faPlus} className=" account-icon" />
            </Button>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span>Pracuję w firmię: </span>
            <label className="d-inline-block font-xs mx-4">
              <select className="form-control">
                <option key={0} value="" selected>
                  Brak
                </option>
                {companies.map(company => (
                  <option key={company.id_company} value={company.id_company}>
                    {company.company_name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {(myCompanyProfile || companyFormActive) && (
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
      )}
    </div>
  );
};

export default CompanyForm;
