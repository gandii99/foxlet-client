import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import React, { SetStateAction, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';
import uploadImage from '../../../lib/cloudinary';

import axios, { Axios } from 'axios';
const UserSchema = z.object({
  user_name: z.string().min(1, { message: 'name is required' }).optional(),
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email({ message: 'provide valid email address' })
    .optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  avatar: z.string().optional(),
});

type typeUser = z.infer<typeof UserSchema>;

const UserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typeUser>({
    resolver: zodResolver(UserSchema),
  });

  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [image, setImage] = useState<string | null>(null);

  const { session } = useAuth();

  useEffect(() => {
    if (session?.user.id) {
      const userData = accountAPI
        .getMyUser()
        .then(response => {
          console.log(response.data);
          const defaultValues = {
            ...response.data,
          };
          console.log('test', defaultValues);
          reset({ ...defaultValues, password: '' });
        })
        .catch(err => {
          console.log('error', err);
        });
    }
  }, []);

  const setUploadProgress = (e: number) => {
    console.log(e);
  };

  useEffect(() => {
    if (!selectedFile) return;
    const abortController = new AbortController();
    const { signal } = abortController;

    uploadImage(selectedFile, p => setUploadProgress(p), signal)
      .then(image => {
        console.log('image.url', image.url);
        setImage(image.url);
      })
      .catch(e => {
        if (!signal?.aborted) {
          console.error(e);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [selectedFile]);

  const onSubmit = (data: typeUser) => {
    if (image) {
      data = { ...data, avatar: image };
    }
    accountAPI.updateMyUserProfileData(data);
  };

  return (
    <div>
      <h2>Moje dane</h2>
      <form
        className="d-flex flex-wrap justify-content-around"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="col-5 font-xs">
          Email
          <input {...register('email')} className="form-control" />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label className="col-5 font-xs">
          Nazwa użytkownika
          <input className="form-control" {...register('user_name')} />
          {errors.user_name && <span>{errors.user_name.message}</span>}
        </label>
        <label className="col-5 font-xs">
          Hasło
          <input
            className="form-control"
            {...register('password')}
            type="password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <label className="col-5 font-xs">
          Rola
          <select className="form-control" {...register('role')}>
            <option key={0} value="" disabled>
              Wybierz
            </option>
            <option key="employee" value="employee">
              Pracownik
            </option>
            <option key="client" value="client">
              Wybierz
            </option>
          </select>
          {errors.role && <span>{errors.role.message}</span>}
        </label>
        <label className="col-5 font-xs">
          Nazwa użytkownika
          <input
            // ref={fileInputRef}
            className={'hidden'}
            onChange={({ target }) => {
              setSelectedFile(target.files?.[0]);
            }}
            type="file"
            id={'file'}
            accept="image/*"
          />
        </label>

        <Button type="submit" className="w-100 mt-4 button-orange-first">
          Dodaj
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
