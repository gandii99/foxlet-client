import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { useAuth } from '../../hooks/use-auth';
import { Link } from 'react-router-dom';

export interface IHomePageProps {
  setSession?: (params: any) => any;
  // session: object;
}

const HomePage: React.FC<IHomePageProps> = () => {
  const { session } = useAuth();
  return (
    <div className="content-min-height">
      <section className="container">
        <h1>Foxlet</h1>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          cupiditate praesentium perspiciatis nostrum, delectus reprehenderit
          quasi beatae alias! Facere quibusdam cumque necessitatibus eligendi
          quisquam ad facilis minima eaque modi commodi.
        </span>
        <section className="d-flex justify-content-between foto-container mt-4">
          <div>
            <img
              src={process.env.PUBLIC_URL + 'images/zdj1.jpg'}
              alt="logo lis"
            />
            <h4>Palety</h4>
            <span>Możesz nam zaufać. Oddaj nam swoje pieniążki.</span>
          </div>
          <div>
            <img
              src={process.env.PUBLIC_URL + 'images/zdj1.jpg'}
              alt="logo lis"
            />
            <h4>Zakupy online</h4>
            <span>Możesz nam zaufać. Oddaj nam swoje pieniążki.</span>
          </div>
          <div>
            <img
              src={process.env.PUBLIC_URL + 'images/zdj1.jpg'}
              alt="logo lis"
            />
            <h4>Zarzadzanie asortymentem</h4>
            <span>Możesz nam zaufać. Oddaj nam swoje pieniążki.</span>
          </div>
        </section>

        <div className="mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          cupiditate praesentium perspiciatis nostrum, delectus reprehenderit
          quasi beatae alias! Facere quibusdam cumque necessitatibus eligendi
          quisquam ad facilis minima eaque modi commodi. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Soluta cupiditate praesentium
          perspiciatis nostrum, delectus reprehenderit quasi beatae alias!
          Facere quibusdam cumque necessitatibus eligendi quisquam ad facilis
          minima eaque modi commodi.
        </div>
      </section>
    </div>
  );
};

export default HomePage;
