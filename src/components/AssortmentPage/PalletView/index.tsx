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
import { useGetMyPalletsQuery } from '../../../hooks/query/assortment';

const PalletView = () => {
  const { session } = useAuth();
  const { data: myPallets, isSuccess } = useGetMyPalletsQuery();

  // const [pallets, setPallets] = useState<PalletCardType[]>([]);

  // useEffect(() => {
  //   if (session?.user.id) {
  //     const pallets = assortmentAPI
  //       .getMyPallets()
  //       .then(response => {
  //         console.log(response.data);
  //         setPallets(response.data);
  //       })
  //       .catch(err => {
  //         console.log('error', err);
  //       });
  //     console.log(pallets);
  //   }
  // }, [refresh]);

  if (!isSuccess) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-start align-items-center col-12 mb-4">
        <h2 className="mb-0">Twoje palety</h2>
        <Link
          to="/assortment/add-pallet"
          type="submit"
          className="button-orange-first button-add-size mx-3 font-m "
        >
          <FontAwesomeIcon icon={faPlus} className="account-icon" />
        </Link>
      </div>

      {myPallets.length === 0 ? (
        <span>Aktualnie nie posiadasz jeszcze żadnych palet...</span>
      ) : (
        <div className="d-flex flex-wrap justify-content-start">
          {myPallets.map(pallet => {
            console.log(pallet.id_pallet);
            return <PalletCard key={pallet.id_pallet} {...pallet} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PalletView;
