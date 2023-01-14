import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useAuth } from '../../../hooks/use-auth';
import { useAuth } from '../../../hooks/use-auth';
import { APIError } from '../../../lib/api/types';
import assortmentAPI from '../../../services/assortment';
import { SupplierCardType } from '../SupplierView/types';
import { useCreatePalletsMutation } from '../../../hooks/mutation/assortment';
// import { FieldsType } from './types';
// import accountAPI from '../../../services/account';

const Fields = [
  {
    title: 'Nazwa',
    id: 'pallet_name',
    require: false,
    class: '',
  },
  {
    title: 'Dostawca',
    id: 'id_supplier',
    require: false,
    class: '',
  },
  {
    title: 'Cena zakupu',
    id: 'purchase_price',
    require: true,
    class: '',
  },
  {
    title: 'Data zakupu',
    id: 'purchase_date',
    require: true,
    class: '',
  },
  {
    title: 'Data dostawy',
    id: 'delivery_date',
    require: true,
    class: '',
  },
] as const;

type FieldsType = Record<typeof Fields[number]['id'], string>;

const PalletForm = () => {
  const navigation = useNavigate();
  const { mutate: createPallet } = useCreatePalletsMutation();
  // const onSucess = () => {
  //   navigation('/assortment/pallets');
  //   toast.success('Sprzedawca został dodany.', {});
  //   console.log('git');
  // };
  // const onError = (error: APIError) => {
  //   console.log('error', error);
  //   toast.error('Dodanie sprzedawcy nie powiodło się!');
  // };
  const { session } = useAuth();
  const [formsValues, setFormsValues] = useState<FieldsType>({
    pallet_name: '',
    id_supplier: '',
    // id_employee: '',
    purchase_price: '',
    purchase_date: '',
    delivery_date: '',
  });

  const [suppliers, setSuppliers] = useState<SupplierCardType[]>([]);

  useEffect(() => {
    if (session?.user.id) {
      const pallets = assortmentAPI
        .getAllSuppliers()
        .then(response => {
          console.log(response.data);
          setSuppliers(response.data);
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(pallets);
    }
  }, []);

  const updateFormValues = (name: string, value: string) => {
    setFormsValues({ ...formsValues, [name]: value });
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createPallet({
      ...formsValues,
      id_supplier: Number(formsValues.id_supplier),
      purchase_price: Number(formsValues.purchase_price),
    });
    // assortmentAPI.createPallet(
    // {
    //   ...formsValues,
    //   id_supplier: Number(formsValues.id_supplier),
    //   purchase_price: Number(formsValues.purchase_price),
    // }
    //   // onSucess,
    //   // onError
    // );
  };

  return (
    <div>
      <h2>Dodaj paletę</h2>

      <form
        className="d-flex flex-wrap justify-content-around"
        onSubmit={async e => formHandler(e)}
      >
        {Fields.map(field => {
          return (
            <div className="col-xl-6 px-2" key={field.id}>
              <label htmlFor={field.id} className="font-xs">
                {field.title}
              </label>
              {field.id == 'id_supplier' ? (
                <select
                  className="form-control font-xs"
                  required
                  onChange={e => updateFormValues(field.id, e.target.value)}
                >
                  <option value="" selected disabled>
                    Wybierz
                  </option>
                  {suppliers.map(supplier => (
                    <option
                      key={supplier.id_supplier}
                      value={supplier.id_supplier}
                    >
                      {supplier.supplier_name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.id}
                  className="form-control font-xs"
                  placeholder={field.title}
                  value={formsValues[field.id]}
                  onChange={e => updateFormValues(field.id, e.target.value)}
                  required={field.require}
                />
              )}
            </div>
          );
        })}
        <Button type="submit" className="w-100 mt-4 button-orange-first">
          Dodaj
        </Button>
      </form>
    </div>
  );
};

export default PalletForm;
