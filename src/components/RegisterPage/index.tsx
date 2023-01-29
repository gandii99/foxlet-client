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
  role: z.string().min(1, { message: 'Wybierz role' }).optional(),
});

type registerSchema = z.infer<typeof CreateAccont>;

const RegisterPage = () => {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<registerSchema>({
    resolver: zodResolver(CreateAccont),
  });

  const onSubmit = (data: registerSchema) => {
    authAPI.register(
      { ...data, role: 'employee' },
      () =>
        onSuccess('Rejestracja zakończona powodzeniem.', '/login', navigation),
      e => onError(e, 'Rejestracja nie powiodła się')
    );
  };
  console.log(errors);
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
          {/* <label className="font-xs col-11 mt-3">
            Rola
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
          </label> */}
          <Button
            type="submit"
            // disabled={isCreatePalletLoading}
            className="col-11 mt-4 button-orange-first"
          >
            Zarejestruj się
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
              <img
                className="square-54 mx-1 opacity-75"
                src="/images/komputer_icon.png"
              ></img>
              <span className="font-s px-3 my-auto">zamawiaj szybciej</span>
            </div>
            <div className="d-flex pb-2">
              <img
                className="square-54 m-1 opacity-75"
                src="/images/ankieta_icon.png"
              ></img>
              <span className="font-s px-3 my-auto">
                sprawdzaj poprzednie zamówienia
              </span>
            </div>
            <div className="d-flex pb-2">
              <img
                className="square-54 m-1 opacity-75"
                src="/images/lupa_icon.png"
              ></img>
              <span className="font-s px-3 my-auto">
                śledź status zamówienia
              </span>
            </div>
            <div className="d-flex pb-2">
              {/* <span className="mr-4">
                <img src="https://assets.x-kom.pl/public-spa/xkom/a72fe3e39b797784.svg"></img>
              </span> */}
              <img
                className="square-54 m-1 opacity-75"
                src="/images/sale_icon.png"
              ></img>
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
