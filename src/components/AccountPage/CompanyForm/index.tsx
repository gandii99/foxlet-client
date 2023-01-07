import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';

const Fields = [
  {
    title: 'Imię',
    id: 'first_name',
    require: false,
    class: '',
  },
  {
    title: 'Nazwisko',
    id: 'last_name',
    require: true,
    class: '',
  },
  {
    title: 'Nazwa firmy',
    id: 'company_name',
    require: true,
    class: '',
  },
  {
    title: 'NIP',
    id: 'NIP',
    require: true,
    class: '',
  },
  {
    title: 'REGON',
    id: 'REGON',
    require: true,
    class: '',
  },

  {
    title: 'Telefon',
    id: 'phone',
    require: true,
    class: '',
  },

  {
    title: 'Adres e-mail',
    id: 'email',
    require: true,
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

const CompanyForm = () => {
  const { session } = useAuth();
  const [isExistsCompany, setIsExistsCompany] = useState(false);
  const [formsValues, setFormsValues] = useState<FieldsType>({
    first_name: '',
    last_name: '',
    company_name: '',
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

  useEffect(() => {
    if (session?.user.id) {
      const userData = accountAPI
        .getMyCompany()
        .then(response => {
          console.log(response.data);
          if (response.data) {
            setIsExistsCompany(true);
            setFormsValues({ ...response.data });
          }
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(userData);
    }
  }, []);

  const updateFormValues = (name: string, value: string) => {
    setFormsValues({ ...formsValues, [name]: value });
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    accountAPI.updateMyCompanyProfileData(formsValues);

    e.preventDefault();
    if (isExistsCompany) {
      console.log('istnieje');
      const formsWhitoutNull = Object.fromEntries(
        Object.entries(formsValues).filter(([key, value]) => value !== null)
      );
      console.log(formsWhitoutNull);
      accountAPI.updateMyCompanyProfileData(formsWhitoutNull);
    } else {
      console.log('nie istnieje');
      accountAPI.createCompany(formsValues);
    }
  };

  return (
    <div>
      <h2>Firma</h2>
      <form
        className="d-flex flex-wrap justify-content-around"
        onSubmit={async e => formHandler(e)}
      >
        {Fields.map(field => {
          return (
            <div className="col-6 px-2" key={field.id}>
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
          {isExistsCompany ? 'Aktualizuj' : 'Utwórz konto firmy'}
        </Button>
      </form>
    </div>
  );
};

export default CompanyForm;
