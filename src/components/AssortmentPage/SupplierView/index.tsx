import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';
import assortmentAPI from '../../../services/assortment';
import SupplierCard from './SupplierCard';
import { FieldsType } from './types';

const SupplierForm = () => {
  const { session } = useAuth();
  const [formsValues, setFormsValues] = useState<FieldsType[]>([]);

  useEffect(() => {
    if (session?.user.id_user) {
      const userData = assortmentAPI
        .getMySuppliers()
        .then(response => {
          console.log(response.data);
          setFormsValues(response.data);
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(userData);
    }
  }, []);

  return (
    <div>
      <h2>Twoi dostawcy</h2>
      {(formsValues.length <= 0 && (
        <span>Aktualnie nie dodałeś jeszcze żadnego sprzedawcy...</span>
      )) || (
        <div className="d-flex">
          {formsValues.map(supplier => (
            <SupplierCard
              key={supplier.NIP}
              supplier_name={supplier.supplier_name}
              NIP={supplier.NIP}
              id_supplier={Number(supplier.id_supplier)}
            />
          ))}
        </div>
      )}

      <Link
        to="/assortment/add-supplier"
        type="submit"
        className="w-100 mt-4 button-orange-first py-1"
      >
        Dodaj sprzedawce
      </Link>
    </div>
  );
};

export default SupplierForm;
