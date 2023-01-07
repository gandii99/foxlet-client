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
    id: 'user_name',
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
    user_name: '',
    role: '',
  });

  useEffect(() => {
    if (session?.user.id) {
      const userData = accountAPI
        .getMyUser()
        .then(response => {
          console.log(response.data);
          setFormsValues({ ...response.data, password: '' });
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(userData);
    }
  }, []);

  console.log('formsValues', formsValues['email']);

  const updateFormValues = (user_name: string, value: string) => {
    setFormsValues({ ...formsValues, [user_name]: value });
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('istnieje');
    const formsWhitoutNull = Object.fromEntries(
      Object.entries(formsValues).filter(([key, value]) => value !== null)
    );
    console.log(formsWhitoutNull);
    accountAPI.updateMyUserProfileData(formsWhitoutNull);
  };

  return (
    <div>
      <h2>Moje dane</h2>
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
