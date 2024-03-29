import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import React, { SetStateAction, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../../hooks/use-auth';
import uploadImage from '../../../lib/cloudinary';
import InputText from '../../InputText';
import { useGetMyUserProfileQuery } from '../../../hooks/query/account';
import { onSuccess } from '../../../lib/toastHelpers';
import { useUpdateMyUserProfileMutation } from '../../../hooks/mutation/account';

const UserSchema = z.object({
  user_name: z.string().min(1, { message: 'name is required' }).optional(),
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email({ message: 'provide valid email address' })
    .optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  avatar: z.preprocess(
    val =>
      (val && typeof val === 'string' && val.length > 1 && val) || undefined,
    z.string().min(1, { message: 'password is required' }).optional()
  ),
});

export type typeUser = z.infer<typeof UserSchema>;

const UserForm = () => {
  const { session, refreshMyUserProfileData } = useAuth();
  const { data: myUserProfile, isSuccess: isGetMyUserProfileSucces } =
    useGetMyUserProfileQuery();

  const {
    mutate: updateMyUserProfile,
    isLoading: isUpdateMyUserProfileLoading,
  } = useUpdateMyUserProfileMutation(() => {
    onSuccess('Profil użytkownika został zaktualizowany');
    refreshMyUserProfileData();
  });

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

  const setUploadProgress = (e: number) => {
    console.log(e);
  };

  useEffect(() => {
    console.log('useEffect');
    if (myUserProfile) {
      reset({ ...myUserProfile, password: '' });
    }
  }, [myUserProfile, reset]);

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
    updateMyUserProfile(data);
  };
  console.log(errors);
  if (!isGetMyUserProfileSucces) {
    return <div>Loading</div>;
  }

  return (
    <div className="d-flex flex-column col-xl-8 align-items-start justify-content-center m-auto">
      <div className="d-flex flex-row col-12 col-sm-6 justify-content-center justify-content-sm-start py-2 px-sm-4">
        <h2 className="">Moje dane</h2>
      </div>
      <form
        className="d-flex flex-wrap justify-content-around "
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputText
          label="Email"
          placeholder="jan.kowalski@gmail.com"
          name="email"
          register={register('email')}
          classLabel="font-xs col-5 mt-3"
          classInput="form-control"
          classError="font-13 text-danger"
          errors={errors}
        />
        <InputText
          label="Nazwa użytkownika"
          placeholder="JankoMuzykant"
          name="user_name"
          register={register('user_name')}
          classLabel="font-xs col-5 mt-3"
          classInput="form-control"
          classError="font-13 text-danger"
          errors={errors}
        />

        <label className="font-xs col-5">
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
            {/* <option key="client" value="client">
              Wybierz
            </option> */}
          </select>
          {errors.role && <span>{errors.role.message}</span>}
        </label>
        <label className="col-11 font-xs">
          Avatar
          <input
            // ref={fileInputRef}
            className={' form-control'}
            onChange={({ target }) => {
              setSelectedFile(target.files?.[0]);
            }}
            type="file"
            id={'file'}
            accept="image/*"
          />
        </label>

        <Button
          type="submit"
          className="col-11 mt-4 button-orange-first"
          disabled={isUpdateMyUserProfileLoading}
        >
          Aktualizuj
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
