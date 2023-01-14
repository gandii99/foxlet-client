import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import assortmentAPI from '../../../services/assortment';
import { SupplierCardType } from '../SupplierView/types';
import { BatchType, ConditionType, ProductType } from './types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { onError, onSuccess } from '../../../lib/toastHelpers';
import { useCreateBatchMutation } from '../../../hooks/mutation/pallet';

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

const BatchAdd = ({ id_pallet, handleCloseModal }: BatchAddProps) => {
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
      onSuccess();
    });

  const onSubmit = (data: typeBatch) => {
    console.log('onSubmit');
    createBatch({ ...data, id_pallet: id_pallet });
  };

  console.log(errors);
  useEffect(() => {
    if (session?.user.id) {
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
      <label className="font-s  col-11">
        Nazwa partii
        <input {...register('batch_name')} className="form-control" />
        {errors.batch_name && (
          <span className="font-13 text-danger">
            {errors.batch_name.message}
          </span>
        )}
      </label>
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

      <label className="font-xs col-5 mt-3">
        Ilość w dostawie
        <input {...register('quantity_in_delivery')} className="form-control" />
        {errors.quantity_in_delivery && (
          <span className="font-13 text-danger">
            {errors.quantity_in_delivery.message}
          </span>
        )}
      </label>
      <label className="font-xs col-5 mt-3">
        Ilość w magazynie
        <input {...register('quantity_in_stock')} className="form-control" />
        {errors.quantity_in_stock && (
          <span className="font-13 text-danger">
            {errors.quantity_in_stock.message}
          </span>
        )}
      </label>
      <label className="font-xs col-5 mt-3">
        Cena zakupu
        <input {...register('purchase_price')} className="form-control" />
        {errors.purchase_price && (
          <span className="font-13 text-danger">
            {errors.purchase_price.message}
          </span>
        )}
      </label>
      <label className="font-xs col-5 mt-3">
        Cena sprzedaży
        <input {...register('selling_price')} className="form-control" />
        {errors.selling_price && (
          <span className="font-13 text-danger">
            {errors.selling_price.message}
          </span>
        )}
      </label>
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

export default BatchAdd;
