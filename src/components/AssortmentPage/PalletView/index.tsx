import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import accountAPI from '../../../services/account';
import assortmentAPI from '../../../services/assortment';
import { SupplierCardType } from '../SupplierView/types';
import PalletCard from './PalletCard';
import { FieldsType, PalletCardType } from './types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
      <div className="d-flex flex-wrap justify-content-start align-items-center col-12 mb-4">
        <h2 className="mb-0">Twoje palety</h2>
        <Button
          className="button-orange-first button-add-size mx-3 font-m "
          type="submit"
          // onClick={() => {
          //   ;
          //   console.log('swap kurwa', editActive);
          // }}
        >
          <FontAwesomeIcon icon={faPlus} className="account-icon" />
        </Button>
      </div>

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
