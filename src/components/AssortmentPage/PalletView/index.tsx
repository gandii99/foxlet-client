import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';
import assortmentAPI from '../../../services/assortment';
import { SupplierCardType } from '../SupplierView/types';
import PalletCard from './PalletCard';
import { FieldsType, PalletCardType } from './types';

const PalletView = () => {
  const { session } = useAuth();
  const [pallets, setPallets] = useState<PalletCardType[]>([]);

  useEffect(() => {
    if (session?.user.id) {
      const pallets = assortmentAPI
        .getMyPallets()
        .then(response => {
          console.log(response.data);
          setPallets(response.data);
        })
        .catch(err => {
          console.log('error', err);
        });
      console.log(pallets);
    }
  }, []);

  if (!pallets) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Twoje palety</h2>
      {pallets.length === 0 ? (
        <span>Aktualnie nie posiadasz jeszcze żadnych palet...</span>
      ) : (
        <div className="d-flex flex-wrap justify-content-start">
          {pallets.map(pallet => {
            console.log(pallet.id_pallet);
            return <PalletCard key={pallet.id_pallet} {...pallet} />;
          })}
        </div>
      )}

      <Link
        to="/assortment/add-pallet"
        type="submit"
        className="w-100 mt-4 button-orange-first py-1"
      >
        Dodaj palete
      </Link>
    </div>
  );
};

export default PalletView;
