import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { onError, onSuccess } from '../../lib/toastHelpers';
import authAPI from '../../services/auth';
import InputText from '../InputText';

const CreateAccont = z.object({
  user_name: z.string().min(1, { message: 'name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email jest wymagany' })
    .email({ message: 'Podano nieprawidłowy email' }),
  password: z.string().min(1, { message: 'Hasło jest wymagane' }),
  role: z.string().min(1, { message: 'Wybierz role' }),
});

type registerSchema = z.infer<typeof CreateAccont>;

const RegisterPage = () => {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchema>({
    resolver: zodResolver(CreateAccont),
  });

  const onSubmit = (data: registerSchema) => {
    authAPI.register(
      data,
      () =>
        onSuccess('Rejestracja zakończona powodzeniem.', '/login', navigation),
      e => onError(e, 'Rejestracja nie powiodła się')
    );
  };

  return (
    <div className="content-min-height d-flex justify-content-around align-items-start flex-wrap col-lg-12 col-xl-8 m-auto py-5">
      <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 px-4 border rounded-4 py-4 content-fit-height border-shadow my-4">
        <h3 className="pb-4">Zarejestruj się</h3>
        <form
          className="d-flex flex-wrap justify-content-around"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputText
            label="Nazwa"
            placeholder="Jacek"
            name="user_name"
            register={register('user_name')}
            classLabel="font-xs col-11 mt-3"
            classInput="form-control"
            classError="font-13 text-danger"
            errors={errors}
          />
          <InputText
            label="Email"
            placeholder="jacek@gmail.com"
            name="email"
            register={register('email')}
            classLabel="font-xs col-11 mt-3"
            classInput="form-control"
            classError="font-13 text-danger"
            errors={errors}
          />
          <InputText
            label="Hasło"
            name="password"
            type="password"
            register={register('password')}
            classLabel="font-xs col-11 mt-3"
            classInput="form-control"
            classError="font-13 text-danger"
            errors={errors}
          />
          <label className="font-xs col-11 mt-3">
            Dostawca
            <select {...register('role')} className="form-control">
              <option value="">Wybierz</option>
              <option value="employee">Pracownik</option>
              <option value="client" disabled>
                Klient
              </option>
            </select>
            {errors.role && (
              <span className="font-13 text-danger">{errors.role.message}</span>
            )}
          </label>
          <Button
            type="submit"
            // disabled={isCreatePalletLoading}
            className="col-11 mt-4 button-orange-first"
          >
            Dodaj
          </Button>
        </form>
      </div>
      <aside className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-5 px-4 py-4 content-fit-height">
        <div>
          <h3 className="">Masz konto?</h3>
          <Link to="/login" className="button-orange-second py-1 mt-4 ">
            Zaloguj się
          </Link>
        </div>
        <div className="mt-5">
          <h4 className="pb-2">Dlaczego warto korzystać z Foxlet</h4>
          <div>
            <div className="d-flex pb-2">
              <span>
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjR2NjRIMHoiLz48ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIHN0cm9rZT0iIzAwODJGQSIgZD0iTTQ3LjUgNDguNUg1M2MuOTEzLS4wMSAxLjM0MiAwIDEuOTIxIDBzMS4yNzktMS41OC0uNDIxLTNsLTQtMy41di02Ii8+PHBhdGggc3Ryb2tlPSIjNjQ2NDY0IiBkPSJNMTEuNSAyMC41di0yLjA2Yy0uMDEyLTEuMDQuNDI2LTIuMDQzIDEuMjE2LTIuNzgzLjc5LS43NCAxLjg2Ni0xLjE1NyAyLjk5LTEuMTU3aDMwLjU4OWE0LjM3IDQuMzcgMCAwIDEgMi45NzYgMS4xMzljLjc5LjczMSAxLjIzMSAxLjcyNCAxLjIyOSAyLjc1OFYyMC41TTUwLjUgMzYuNXYtNCIvPjxwYXRoIHN0cm9rZT0iIzk0OTQ5NCIgZD0iTTExLjUgMzJ2My41Ii8+PHBhdGggc3Ryb2tlPSIjNjQ2NDY0IiBkPSJNMTQuNSA0Mi41aDMzTTI2LjUgNDUuNWg5Ii8+PHBhdGggc3Ryb2tlPSIjMEZEMkZGIiBkPSJNMTEuNSAzNS41VjQybC0zLjM5NCAzLjUyMmExLjk2OCAxLjk2OCAwIDAgMC0uNDMzIDIuMjI2Yy4zNDEuNzU3LjkzLjc2MiAxLjc5My43NUgzNi41Ii8+PHBhdGggc3Ryb2tlPSIjMDA4MkZBIiBkPSJNMzYgNDguNWgxNSIvPjxwYXRoIHN0cm9rZT0iIzk0OTQ5NCIgZD0iTTYgMjQuNWgxMUg2ek0xMS41IDI5LjVoNU0zLjUgMjkuNWg1Ii8+PHBhdGggc3Ryb2tlPSIjNjQ2NDY0IiBkPSJNNDYuNSAyNC41aDZNNTQuNSAyNC41aDNNNTEuNSAyOC41aDEwTTQ2LjUgMzIuNWg5TTI0LjcwNyAzNS41TDIyIDI3LjY3NGwxOC0uMTc0LTIuNzA3IDh6TTI4LjUgMjJsLTQuMDYgNC42OE0zMyAyMmw0IDUiLz48L2c+PC9nPjwvc3ZnPg=="></img>
              </span>
              <span className="font-s px-3 my-auto">zamawiaj szybciej</span>
            </div>
            <div className="d-flex pb-2">
              <span>
                <img src="https://assets.x-kom.pl/public-spa/xkom/f9c6c082f8116a0a.svg"></img>
              </span>
              <span className="font-s px-3 my-auto">
                sprawdzaj poprzednie zamówienia
              </span>
            </div>
            <div className="d-flex pb-2">
              <span>
                <img
                  src="https://assets.x-kom.pl/public-spa/xkom/31d993f64c783c8d.svg"
                  alt=""
                />
              </span>
              <span className="font-s px-3 my-auto">
                śledź status zamówienia
              </span>
            </div>
            <div className="d-flex pb-2">
              <span className="mr-4">
                <img src="https://assets.x-kom.pl/public-spa/xkom/a72fe3e39b797784.svg"></img>
              </span>
              <span className="font-s px-3 my-auto">
                korzystaj z rabatów i promocji
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default RegisterPage;
