import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/use-auth';
import assortmentAPI from '../../../services/assortment';
import { ConditionType, ProductType } from './types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { onError, onSuccess } from '../../../lib/toastHelpers';
import { useCreateBatchMutation } from '../../../hooks/mutation/batches';
import InputText from '../../InputText';
import InputNumber from '../../InputNumber';

const BatchSchema = z.object({
  id_product: z.preprocess(val => val && Number(val), z.number()),
  id_condition: z.preprocess(val => val && Number(val), z.number()),
  // id_pallet: z.preprocess(val => val && Number(val), z.number()),
  batch_name: z.string().min(3),
  quantity_in_delivery: z.preprocess(val => val && Number(val), z.number()),
  quantity_in_stock: z.preprocess(val => val && Number(val), z.number()),
  purchase_price: z.preprocess(val => val && Number(val), z.number()),
  selling_price: z.preprocess(val => val && Number(val), z.number()),
  description: z
    .string()
    .min(10, { message: 'Wprowadź co najmniej 10 znaków' })
    .optional(),
});

type typeBatch = z.infer<typeof BatchSchema>;

type BatchAddProps = { id_pallet: number; handleCloseModal: () => void };

const BatchCreate = ({ id_pallet, handleCloseModal }: BatchAddProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typeBatch>({
    resolver: zodResolver(BatchSchema),
    defaultValues: { id_product: 0 },
  });

  const { session } = useAuth();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [conditions, setConditions] = useState<ConditionType[]>([]);
  const { mutate: createBatch, isLoading: isCreateBatchLoading } =
    useCreateBatchMutation(() => {
      handleCloseModal();
      onSuccess('Partia została utworzona');
    });

  const onSubmit = (data: typeBatch) => {
    console.log('onSubmit');
    createBatch({ ...data, id_pallet: id_pallet });
  };

  console.log(errors);
  useEffect(() => {
    if (session?.user.id_user) {
      const products = assortmentAPI
        .getAllProducts()
        .then(response => {
          setProducts(response.data);
        })
        .catch(err => {
          console.log('error', err);
        });

      const conditions = assortmentAPI
        .getAllConditions()
        .then(response => {
          setConditions(response.data);
        })
        .catch(err => {
          console.log('error', err);
        });
    }
  }, []);

  return (
    <form
      className="d-flex flex-wrap justify-content-around"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputText
        label="Nazwa partii"
        placeholder="PS4 pro"
        name="batch_name"
        register={register('batch_name')}
        classLabel="font-xs col-11 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />

      <label className="font-xs col-5 mt-3">
        Produkt
        <select
          className="form-control"
          defaultValue={'sdaasda'}
          {...register('id_product')}
        >
          <option value="sdaasda">Wybierz</option>
          {products.map(product => (
            <option key={product.id_product} value={product.id_product}>
              {product.product_name}
            </option>
          ))}
        </select>
        {errors.id_product && (
          <span className="font-13 text-danger">
            {errors.id_product.message}
          </span>
        )}
      </label>
      <label className="font-xs col-5 mt-3">
        Stan
        <select {...register('id_condition')} className="form-control">
          <option value="">Wybierz</option>
          {conditions.map(condition => (
            <option key={condition.id_condition} value={condition.id_condition}>
              {condition.condition_name}
            </option>
          ))}
        </select>
        {errors.id_condition && (
          <span className="font-13 text-danger">
            {errors.id_condition.message}
          </span>
        )}
      </label>

      <InputNumber
        label="Ilość w dostawie"
        placeholder={5}
        name="quantity_in_delivery"
        register={register('quantity_in_delivery')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputNumber
        label="Ilość w magazynie"
        placeholder={5}
        name="quantity_in_stock"
        register={register('quantity_in_stock')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputNumber
        label="Cena zakupu"
        placeholder={249.99}
        name="purchase_price"
        register={register('purchase_price')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />
      <InputNumber
        label="Cena sprzedaży"
        placeholder={249.99}
        name="selling_price"
        register={register('selling_price')}
        classLabel="font-xs col-5 mt-3"
        classInput="form-control"
        classError="font-13 text-danger"
        errors={errors}
      />

      <label className="font-xs col-11 mt-3">
        Opis
        <textarea {...register('description')} className="form-control" />
        {errors.description && (
          <span className="font-13 text-danger">
            {errors.description.message}
          </span>
        )}
      </label>
      <Button
        type="submit"
        disabled={isCreateBatchLoading}
        className="col-11 mt-4 button-orange-first"
      >
        Dodaj
      </Button>
    </form>
  );
};

export default BatchCreate;
