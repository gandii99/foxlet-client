import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useAuth } from '../../../hooks/use-auth';
import { useAuth } from '../../../hooks/use-auth';
import { APIError } from '../../../lib/api/types';
import assortmentAPI from '../../../services/assortment';
import { SupplierCardType } from '../SupplierView/types';
import { BatchType, ConditionType, ProductType } from './types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
// import { FieldsType } from './types';
// import accountAPI from '../../../services/account';

const BatchSchema = z.object({
  id_product: z.preprocess(val => val && Number(val), z.number()),
  id_condition: z.preprocess(val => val && Number(val), z.number()),
  id_pallet: z.preprocess(val => val && Number(val), z.number()),
  batch_name: z.string().optional(),
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

const BatchAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<typeBatch>({
    resolver: zodResolver(BatchSchema),
    defaultValues: { id_pallet: 7, description: 'test' },
  });

  console.log(errors);

  const navigation = useNavigate();
  const onSucess = () => {
    navigation('/assortment/suppliers');
    toast.success('Sprzedawca został dodany.', {});
    console.log('git');
  };
  const onError = (error: APIError) => {
    console.log('error', error);
    toast.error('Dodanie sprzedawcy nie powiodło się!');
  };
  const { session } = useAuth();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [conditions, setConditions] = useState<ConditionType[]>([]);

  const onSubmit = (data: typeBatch) => {
    assortmentAPI.createBatch(data, onSucess, onError);
  };

  useEffect(() => {
    if (session?.user.id) {
      const products = assortmentAPI
        .getAllProducts()
        .then(response => {
          console.log(response.data);
          setProducts(response.data);
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(products);
      const conditions = assortmentAPI
        .getAllConditions()
        .then(response => {
          console.log(response.data);
          setConditions(response.data);
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(conditions);

      const defaultValues = {
        id_pallet: 7,
      };
      console.log('test', defaultValues);
      //   reset(defaultValues);
    }
  }, []);

  return (
    <form
      className="d-flex flex-wrap justify-content-around"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className=" font-xs">
        Product
        <select className="form-control" {...register('id_product')}>
          <option key={0} value="" disabled>
            Wybierz
          </option>
          {products.map(product => (
            <option key={product.id_product} value={product.id_product}>
              {product.product_name}
            </option>
          ))}
        </select>
        {errors.id_product && <span>{errors.id_product.message}</span>}
      </label>
      <label className=" font-xs">
        Paleta
        <input className="form-control" {...register('id_product')} />
        {errors.id_pallet && <span>{errors.id_pallet.message}</span>}
      </label>
      <label className="font-xs">
        Stan
        <select {...register('id_condition')} className="form-control">
          <option key={0} value="" disabled>
            Wybierz
          </option>
          {conditions.map(condition => (
            <option key={condition.id_condition} value={condition.id_condition}>
              {condition.condition_name}
            </option>
          ))}
        </select>
      </label>
      <label className="font-xs">
        Nazwa
        <input {...register('batch_name')} className="form-control" />
      </label>
      <label className="font-xs">
        Ilość w dostawie
        <input {...register('quantity_in_delivery')} className="form-control" />
      </label>
      <label className="font-xs">
        Ilość w magazynie
        <input {...register('quantity_in_stock')} className="form-control" />
      </label>
      <label className="font-xs">
        Cena zakupu
        <input {...register('purchase_price')} className="form-control" />
      </label>
      <label className="font-xs">
        Cena sprzedaży
        <input {...register('selling_price')} className="form-control" />
      </label>
      <label className="font-xs">
        Opis
        <input {...register('description')} className="form-control" />
        {errors.description && <span>{errors.description.message}</span>}
      </label>
      <Button type="submit" className="w-100 mt-4 button-orange-first">
        Dodaj
      </Button>
      <Button
        type="button"
        onClick={() => reset({ id_pallet: 2323 })}
        className="w-100 mt-4 button-orange-first"
      >
        Dodaj
      </Button>
    </form>
  );
};

export default BatchAdd;
