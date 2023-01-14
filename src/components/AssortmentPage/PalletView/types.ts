import { Dispatch, SetStateAction } from 'react';
import { SupplierCardType } from '../SupplierView/types';

export interface ProductType {
  id_product: number;
  product_name: string;
  EAN: string;
  ASIN: string;
  description: string;
}

export interface ConditionType {
  id_condition: number;
  condition_name: string;
  description: string;
}

export interface BatchType {
  id_batch?: number;
  id_pallet?: number;
  batch_name?: string;
  quantity_in_delivery?: number;
  quantity_in_stock?: number;
  purchase_price?: number;
  selling_price?: number;
  description?: string;
  product?: ProductType;
  condition?: ConditionType;
  refresh?: boolean;
  setRefresh?: Dispatch<SetStateAction<boolean>>;
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
