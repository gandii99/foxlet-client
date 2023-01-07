export interface SupplierCardType {
  id_supplier?: number;
  first_name?: string;
  last_name?: string;
  supplier_name?: string;
  NIP?: string;
  REGON?: string;
  phone?: string;
  email?: string;
  country?: string;
  province?: string;
  postal_code?: string;
  city?: string;
  street?: string;
}

const Fields = [
  {
    title: 'Imię',
    id: 'first_name',
    require: false,
    class: '',
  },
  {
    title: 'Nazwisko',
    id: 'last_name',
    require: true,
    class: '',
  },
  {
    title: 'Nazwa firmy',
    id: 'supplier_name',
    require: true,
    class: '',
  },
  {
    title: 'NIP',
    id: 'NIP',
    require: true,
    class: '',
  },
  {
    title: 'REGON',
    id: 'REGON',
    require: true,
    class: '',
  },

  {
    title: 'Telefon',
    id: 'phone',
    require: true,
    class: '',
  },

  {
    title: 'Adres e-mail',
    id: 'email',
    require: true,
    class: '',
  },

  {
    title: 'Kraj',
    id: 'country',
    require: true,
    class: '',
  },

  {
    title: 'Województwo',
    id: 'province',
    require: true,
    class: '',
  },

  {
    title: 'Kod pocztowy',
    id: 'postal_code',
    require: true,
    class: '',
  },
  {
    title: 'Miasto',
    id: 'city',
    require: true,
    class: '',
  },
  {
    title: 'Ulica',
    id: 'street',
    require: true,
    class: '',
  },
] as const;

export type FieldsType = Record<typeof Fields[number]['id'], string>;
