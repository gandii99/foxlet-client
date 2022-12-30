import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import api from '../../../lib/api';
import accountAPI from '../../../services/account';

const Fields = [
  {
    title: 'Email',
    id: 'email',
    type: 'input',
    require: false,
    class: '',
  },
  {
    title: 'Nazwa',
    id: 'name',
    type: 'input',
    require: false,
    class: '',
  },
  {
    title: 'Rola',
    id: 'role',
    type: 'input',
    require: false,
    class: '',
  },
  {
    title: 'Hasło',
    id: 'password',
    type: 'password',
    require: true,
    class: '',
  },
] as const;

type FieldsType = Record<typeof Fields[number]['id'], string>;

const UserForm = () => {
  const { session } = useAuth();
  const [formsValues, setFormsValues] = useState<FieldsType>({
    email: '',
    password: '',
    name: '',
    role: '',
  });

  useEffect(() => {
    if (session?.user.id) {
      const userData = accountAPI
        .getSelectedUsers([session?.user.id])
        .then(response => {
          console.log(response.data);
          setFormsValues({ ...response.data[0], password: '' });
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(userData);
    }
  }, []);

  console.log('formsValues', formsValues['email']);

  const updateFormValues = (name: string, value: string) => {
    setFormsValues({ ...formsValues, [name]: value });
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    accountAPI.updateMyUserProfileData(formsValues);
  };

  return (
    <div>
      <h2>Moje dane</h2>
      <form onSubmit={async e => formHandler(e)}>
        {Fields.map(field => {
          return (
            <div className="col-xl-12" key={field.id}>
              <label htmlFor={field.id} className="font-xs">
                {field.title}
              </label>
              <input
                className="form-control font-xs"
                id={field.id}
                type={field.type}
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

export default UserForm;
