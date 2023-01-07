import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useAuth } from '../../../hooks/use-auth';
import { useAuth } from '../../../hooks/use-auth';
import { APIError } from '../../../lib/api/types';
import assortmentAPI from '../../../services/assortment';
// import accountAPI from '../../../services/account';

const Fields = [
  {
    title: 'Imię',
    id: 'first_name',
    require: true,
    class: '',
  },
  {
    title: 'Nazwisko',
    id: 'last_name',
    require: true,
    class: '',
  },
  {
    title: 'Nazwa dostawcy',
    id: 'supplier_name',
    require: false,
    class: '',
  },
  {
    title: 'NIP',
    id: 'NIP',
    require: false,
    class: '',
  },
  {
    title: 'REGON',
    id: 'REGON',
    require: false,
    class: '',
  },

  {
    title: 'Telefon',
    id: 'phone',
    require: false,
    class: '',
  },

  {
    title: 'Adres e-mail',
    id: 'email',
    require: false,
    class: '',
  },

  {
    title: 'Kraj',
    id: 'country',
    require: true,
    class: '',
  },

  {
    title: 'Województwo',
    id: 'province',
    require: true,
    class: '',
  },

  {
    title: 'Kod pocztowy',
    id: 'postal_code',
    require: true,
    class: '',
  },
  {
    title: 'Miasto',
    id: 'city',
    require: true,
    class: '',
  },
  {
    title: 'Ulica',
    id: 'street',
    require: true,
    class: '',
  },
] as const;

type FieldsType = Record<typeof Fields[number]['id'], string>;

const SupplierForm = () => {
  const navigation = useNavigate();
  const onSucess = () => {
    navigation('/assortment/suppliers');
    toast.success('Sprzedawca został dodany.', {});
    console.log('git');
  };
  const onError = (error: APIError) => {
    console.log('error', error);
    toast.error('Dodanie sprzedawcy nie powiodło się!');
  };
  const { session } = useAuth();
  const [formsValues, setFormsValues] = useState<FieldsType>({
    first_name: '',
    last_name: '',
    supplier_name: '',
    NIP: '',
    REGON: '',
    phone: '',
    email: '',
    country: '',
    province: '',
    postal_code: '',
    city: '',
    street: '',
  });

  const updateFormValues = (name: string, value: string) => {
    setFormsValues({ ...formsValues, [name]: value });
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    assortmentAPI.createSupplier(formsValues, onSucess, onError);
  };

  return (
    <div>
      <h2>Dodaj dostawcę</h2>

      <form
        className="d-flex flex-wrap justify-content-around"
        onSubmit={async e => formHandler(e)}
      >
        {Fields.map(field => {
          return (
            <div className="col-xl-6 px-2" key={field.id}>
              <label htmlFor={field.id} className="font-xs">
                {field.title}
              </label>
              <input
                id={field.id}
                className="form-control font-xs"
                placeholder={field.title}
                value={formsValues[field.id]}
                onChange={e => updateFormValues(field.id, e.target.value)}
                required={field.require}
              />
            </div>
          );
        })}
        <Button type="submit" className="w-100 mt-4 button-orange-first">
          Dodaj
        </Button>
      </form>
    </div>
  );
};

export default SupplierForm;
