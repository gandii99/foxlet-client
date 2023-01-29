import React from 'react';
import './index.css';

const FooterHome: React.FC = () => {
  return (
    <footer className="d-flex justify-content-between align-items-start flex-wrap border-top m-auto col-11 col-lg-10 col-xl-8 py-1">
      <div className="col-12 col-lg-4 col-xl-4 d-flex d-md-flex flex-wrap justify-content-between">
        <div className="col-xl-12">
          <span className="font-14">Masz pytania?</span>
          <a className="font-14 px-2" href="tel: 123 234 123">
            123 234 123
          </a>
        </div>
        <div className="col-xl-12">
          <span className="font-14">Regulamin</span>
          <span className="font-14 px-2">Polityka prywatności</span>
        </div>
      </div>

      <div className="col-12 col-sm-7 col-lg-4 col-xl-4 d-flex d-md-flex flex-wrap justify-content-start">
        <div>
          <span className="font-14 d-flex mt-1">
            Administratorem Twoich danych osobowych jest foxlet sp. z o.o. z
            siedzibą w Gromniku
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;
