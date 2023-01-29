import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI, { CompanyType } from '../../../services/account';
import { z, object } from 'zod';
import { useForm } from 'react-hook-form';

import { onError, onSuccess } from '../../../lib/toastHelpers';
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
import { APIError } from '../../../lib/api/types';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import {
  useGetMyCompanyQuery,
  useGetMyEmployeeProfileQuery,
} from '../../../hooks/query/account';
import {
  useCreateMyCompanyMutation,
  useDeleteMyCompanyMutation,
  useSwitchMyCompanyMutation,
  useUpdateMyCompanyMutation,
} from '../../../hooks/mutation/account';
import ModalWrapper from '../../ModalWrapper';
import CompanyCreate from './CompanyCreate';

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

const CompanyView = () => {
  const { session } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [showCompanyForm, setShowCompanyForm] = useState<boolean>(false);
  const [companySwitchActive, setCompanySwitchActive] = useState<boolean>(true);
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const [modalActive, setModalActive] = useState(false);

  const handleCloseModal = () => {
    setModalActive(!modalActive);
  };

  const { data: myCompany, isSuccess: isGetMyCompanySuccess } =
    useGetMyCompanyQuery();

  const { mutate: createMyCompany, isLoading: isCreateMyCompanyLoading } =
    useCreateMyCompanyMutation(() =>
      onSuccess('Profil firmy został utworzony')
    );

  const { mutate: updateMyCompany, isLoading: isUpdateMyCompanyLoading } =
    useUpdateMyCompanyMutation(() =>
      onSuccess('Profil firmy został zaktualizowany')
    );
  const { mutate: switchMyCompany, isLoading: isSwitchMyCompanyLoading } =
    useSwitchMyCompanyMutation(() => {
      onSuccess('Firma została zmieniona');
      setCompanySwitchActive(!companySwitchActive);
    });

  const { mutate: deleteMyCompany, isLoading: isDeleteMyCompanyLoading } =
    useDeleteMyCompanyMutation(() =>
      onSuccess('Profilu firmy został usunięty')
    );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typeCompanyUpdate>({
    resolver: zodResolver(CompanyUpdateSchema),
  });

  useEffect(() => {
    if (session?.user.id_user) {
      if (myCompany) {
        console.log('istnieje', myCompany);
        setSelectedCompany(Number(myCompany.id_company));
        setShowCompanyForm(true);
        reset(myCompany);
      } else {
        setShowCompanyForm(false);
        console.log('nie istnieje', myCompany);
        reset({});
      }
    }
  }, [myCompany, reset, session?.user.id_user]);

  useEffect(() => {
    if (session?.user.id_user) {
      accountAPI.getAllCompanies().then(response => {
        if (response && response.length > 0) {
          setCompanies(response);
        }
      });
    }
  }, [session?.user.id_user]);

  const onSubmit = (data: typeCompanyUpdate) => {
    if (myCompany) {
      updateMyCompany(data);
    }
  };

  const switchCompanyHandler = () => {
    console.log('switchCompanyHandler', selectedCompany);
    switchMyCompany(selectedCompany);
  };

  const deleteCompanyHandler = () => {
    deleteMyCompany();
  };
  {
    console.log(errors);
  }
  if (!isGetMyCompanySuccess) {
    return <div>Loading</div>;
  }
  console.log(myCompany, session);

  return (
    <div className="d-flex flex-column col-xl-8 align-items-start justify-content-center m-auto">
      <div className="col-12 px-3 d-flex flex-wrap justify-content-center justify-content-md-start align-items-center">
        <div className="d-flex flex-row col-12 col-sm-6 justify-content-center justify-content-sm-start py-2 px-sm-4">
          <h2 className="">Firma</h2>
          <Button
            className="button-orange-first button-add-size font-m mx-2"
            onClick={() => handleCloseModal()}
          >
            <FontAwesomeIcon icon={faPlus} className=" account-icon" />
          </Button>
        </div>
        <div className="d-flex flex-row col-12 col-sm-6 justify-content-center justify-content-sm-start py-2 px-sm-3">
          <label className="d-inline-block font-xs ">
            <select
              className="form-control"
              disabled={companySwitchActive}
              onChange={e => {
                setSelectedCompany(
                  e.target.value === '' ? null : Number(e.target.value)
                );
                // switchMyCompany(
                //   e.target.value === '' ? null : Number(e.target.value)
                // );
              }}
              value={selectedCompany || ''}
            >
              <option value="">Brak</option>
              {companies.map(company => (
                <option
                  key={company.id_company}
                  value={company.id_company}
                  // selected={myCompany.id_company === company.id_company}
                >
                  {company.company_name}
                </option>
              ))}
            </select>
          </label>

          <div className="d-flex justify-content-start align-items-center ">
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
                  onClick={() => {
                    switchCompanyHandler();
                  }}
                  disabled={isSwitchMyCompanyLoading}
                >
                  <FontAwesomeIcon icon={faCheck} className=" account-icon" />
                </Button>
                <Button
                  className="button-orange-first button-add-size font-m "
                  onClick={() => {
                    setCompanySwitchActive(!companySwitchActive);
                    setSelectedCompany(
                      (myCompany && Number(myCompany.id_company)) || null
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} className=" account-icon" />
                </Button>
                {myCompany && myCompany?.id_owner == session?.user.id_user && (
                  <Button
                    className="button-orange-first button-add-size font-m "
                    onClick={() => {
                      setCompanySwitchActive(!companySwitchActive);
                      deleteCompanyHandler();
                    }}
                    disabled={isDeleteMyCompanyLoading}
                  >
                    <FontAwesomeIcon icon={faTrash} className=" account-icon" />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {(myCompany || showCompanyForm) && (
        <div className="d-flex flex-wrap justify-content-center col-12 ">
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
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
              disabled={myCompany?.id_owner != session?.user.id_user}
            />
            {myCompany?.id_owner === session?.user.id_user && (
              <Button
                type="submit"
                className="col-11 mt-4 button-orange-first"
                disabled={isCreateMyCompanyLoading || isUpdateMyCompanyLoading}
              >
                {myCompany ? 'Aktualizuj' : 'Utwórz konto firmy'}
              </Button>
            )}
          </form>
        </div>
      )}

      {modalActive && (
        <ModalWrapper title={'Dodaj firmę'} handleCloseModal={handleCloseModal}>
          <CompanyCreate handleCloseModal={handleCloseModal} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default CompanyView;
