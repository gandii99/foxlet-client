import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { useAuth } from '../../hooks/use-auth';
import { Link } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IHomePageProps {
  setSession?: (params: any) => any;
  // session: object;
}

const HomePage: React.FC<IHomePageProps> = () => {
  const { session } = useAuth();
  return (
    <div className="content-min-height">
      <section className="d-flex flex-wrap justify-content-around my-5">
        <div>
          <h1 className="d-flex flex-wrap font-xxxl px-4">
            Witamy&nbsp;w&nbsp;
            <span className="d-inline-block orange-color font-xxxl"> Fox</span>
            Let!
          </h1>
        </div>
      </section>
      <section className="d-flex flex-wrap px-3 px-md-5 justify-content-around orange-background my-5">
        <div className="d-flex flex-wrap justify-content-center py-5">
          <div className="d-flex col-xl-6 justify-content-center align-items-center my-3">
            <img
              className="home-image rounded-3"
              src="/images/orange_boxes.jpg"
              alt="pracownik przenoszący pomarańczowe pudła"
            />
          </div>
          <div className="d-flex flex-wrap justify-content-start col-12 col-sm-10 col-xl-6 px-md-5 py-3">
            <div>
              <h2 className="font-xxl text-white py-2">
                Zarządzaj asortymentem
              </h2>
            </div>
            <div>
              <div className="d-flex justify-content-start align-items-center">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-white font-xl px-2"
                />
                <h3 className="font-l px-4 py-2">
                  Porządkuj swój asortyment, dodając produkty z palet
                </h3>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-start align-items-center">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-white font-xl px-2"
                />
                <h3 className="font-l px-4 py-2">
                  Do każdej palety dodaj kategorię, dostawcę i datę
                </h3>
              </div>
            </div>
            <div className="d-flex justify-content-center col-12 mt-4">
              <Link
                className="button-orange-second font-m px-5 py-2 fw-bold"
                to="/assortment"
              >
                ASORTYMENT
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="d-flex flex-wrap px-3 px-md-5 justify-content-around bg-black my-5">
        <div className="d-flex flex-wrap justify-content-center py-5 px-1 px-md-5">
          <div className="d-flex flex-wrap justify-content-start col-12 col-sm-10 col-xl-6 px-1 px-md-5 py-3">
            <span className="font-xxl orange-color justify-content-center text-center">
              Dane firmy, pracownicy, asortyment, dostawcy - wszystko w jednym
              miejscu!
            </span>
            <div className="d-flex justify-content-center col-12 mt-4">
              <div className="d-flex justify-content-center py-2 col-12 mt-4">
                <Link
                  className="button-orange-first font-m px-5 py-2 fw-bold"
                  to="/login"
                >
                  ZALOGUJ SIĘ
                </Link>
              </div>
            </div>
          </div>
          <div className="d-flex col-xl-6 justify-content-center align-items-center my-3">
            <img
              className="home-image rounded-3"
              src="/images/working_student.jpg"
              alt="pracownik przenoszący pomarańczowe pudła"
            />
          </div>
        </div>
      </section>
      <section className="my-5 px-3">
        <div className="d-flex flex-wrap col-xl-5 justify-content-center m-auto">
          <span className="font-xl text-center">
            Nie masz jeszcze konta? Dołącz do nas i zarządzaj swoją firmą i
            asortymentem
            <span className="orange-color font-xl"> bez żadnych opłat</span>!
          </span>
          <div className="d-flex justify-content-center col-12 mt-4">
            <div className="d-flex justify-content-center py-2 col-12 mt-4">
              <Link
                className="button-orange-second font-m px-5 py-2 fw-bold"
                to="/register"
              >
                ZAREJESTRUJ SIĘ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
