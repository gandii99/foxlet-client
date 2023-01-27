import { Dispatch, SetStateAction } from 'react';
import { CategoryType } from '../../../services/assortment';
import { SupplierCardType } from '../SupplierView/types';

export interface ProductType {
  id_product: number;
  id_category: number;
  image: string;
  product_name: string;
  EAN: string;
  ASIN: string;
  description: string;
  category: CategoryType;
}

export interface ConditionType {
  id_condition: number;
  condition_name: string;
  description: string;
}

export interface PalletType {
  id_pallet: number;
  id_supplier: number;
  id_employee: number;
  pallet_name: string;
  purchase_price: string;
  purchase_date: string;
  delivery_date: string;
}

export interface BatchType {
  id_batch: number;
  id_pallet: number;
  batch_name: string;
  quantity_in_delivery: number;
  quantity_in_stock: number;
  purchase_price: number;
  selling_price: number;
  description: string;
  product: ProductType;
  condition: ConditionType;
  pallet: PalletType;
}

export interface PalletCardType {
  id_pallet: number;
  pallet_name: string;
  supplier: SupplierCardType;
  batch: BatchType[];
  purchase_price: number;
  purchase_date: string;
  delivery_date: string;
}

const Fields = [
  {
    title: 'Nazwa',
    id: 'pallet_name',
    require: false,
    class: '',
  },
  {
    title: 'Dostawca',
    id: 'supplier_name',
    require: false,
    class: '',
  },
  {
    title: 'Nazwa firmy',
    id: 'purchase_price',
    require: true,
    class: '',
  },
  {
    title: 'NIP',
    id: 'purchase_date',
    require: true,
    class: '',
  },
  {
    title: 'REGON',
    id: 'delivery_date',
    require: true,
    class: '',
  },
] as const;

export type FieldsType = Record<typeof Fields[number]['id'], string>;
