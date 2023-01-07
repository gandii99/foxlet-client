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
    title: 'PESEL',
    id: 'PESEL',
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

const EmployeeForm = () => {
  const { session } = useAuth();
  const [isExistsEmployeeProfile, setIsExistsEmployeeProfile] = useState(false);
  const [formsValues, setFormsValues] = useState<FieldsType>({
    first_name: '',
    last_name: '',
    PESEL: '',
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
      const employeeData = accountAPI
        .getMyEmployeeProfile()
        .then(response => {
          console.log(response.data);
          if (response.data) {
            setIsExistsEmployeeProfile(true);
            setFormsValues({ ...response.data });
          }
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(employeeData);
    }
  }, []);

  const updateFormValues = (name: string, value: string) => {
    setFormsValues({ ...formsValues, [name]: value });
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isExistsEmployeeProfile) {
      console.log('istnieje');
      const formsWhitoutNull = Object.fromEntries(
        Object.entries(formsValues).filter(([key, value]) => value !== null)
      );
      console.log(formsWhitoutNull);
      accountAPI.updateMyEmployeeProfileData(formsWhitoutNull);
    } else {
      console.log('nie istnieje');
      accountAPI.createEmployee(formsValues);
    }
  };

  return (
    <div>
      <h2>Pracownik</h2>
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
          {isExistsEmployeeProfile ? 'Aktualizuj' : 'Utwórz konto pracownicze'}
        </Button>
      </form>
    </div>
  );
};

export default EmployeeForm;
