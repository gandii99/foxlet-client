import React, { useEffect, useState } from 'react';
import { ClientType } from '.';

const ClientCard = (props: ClientType) => {
  return (
    <div className="palette-box my-2 px-2 py-3 border rounded-4 border-shadow col-3 mx-1">
      <div className="d-flex justify-content-around align-items-center flex-wrap ">
        <span className="font-m text-nowrap">{props.id_client}</span>
        <span className="font-m text-nowrap">{props.client_name}</span>
        <span className="font-m text-nowrap">{props.first_name}</span>
        <span className="font-m text-nowrap">{props.last_name}</span>
        {/* <span className="font-s ">27.12.2022</span> */}
        <span className="font-m text-nowrap"></span>
      </div>
    </div>
  );
};

export default ClientCard;
