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

const SupplierForm = () => {
  const { session } = useAuth();
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
    // if (session?.user.id) {
    //   const suppliersData = accountAPI
    //     .getSelectedUsers([session?.user.id])
    //     .then(response => {
    //       console.log(response.data[0]);
    //       setFormsValues({ ...response.data[0] });
    //     })
    //     .catch(err => {
    //       console.log('error', err);
    //     });
    //   console.log(suppliersData);
    // }
  }, []);

  const updateFormValues = (name: string, value: string) => {
    setFormsValues({ ...formsValues, [name]: value });
  };

  const [activeField, setActiveField] = useState('pallets');

  return (
    <div>
      <form>
        {Fields.map(field => {
          return (
            <div className="col-xl-12" key={field.id}>
              <input
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
          Aktualizuj
        </Button>
      </form>
    </div>
  );
};

export default SupplierForm;
