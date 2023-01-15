import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/use-auth';
import { APIError } from '../../lib/api/types';
import './index.css';

const LoginPage: React.FC = () => {
  const navigation = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSucess = () => {
    navigation('/');
    toast.success('Zostałeś zalogowany.', {});
    console.log('git');
  };
  const onError = (error: APIError) => {
    console.log('error', error);
    toast.error('Logowanie nie powiodło się!');
  };

  return (
    <div className="content-min-height d-flex justify-content-around align-items-start flex-wrap col-lg-12 col-xl-8 m-auto py-5">
      <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 px-4 border rounded-4 py-4 border-shadow my-4">
        <h3 className="pb-4">Zaloguj się</h3>
        <form
          onSubmit={async e => {
            e.preventDefault();
            login({ email, password }, onSucess, onError);
          }}
        >
          <div className="w-100 mb-3">
            <input
              className="form-control font-xs"
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-100 ">
            <input
              className="form-control font-xs"
              name="password"
              placeholder="Hasło"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <a className="font-s" href="/przypomnienie-hasla">
            Nie pamiętasz hasła?
          </a>
          <Button type="submit" className="w-100 mt-4 button-orange-first">
            Zaloguj
          </Button>
        </form>
      </div>
      <aside className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-5 px-4 py-4 ">
        <div>
          <h3 className="">Nie masz konta?</h3>
          <Link to="/register" className="button-orange-second py-1 mt-4 ">
            Załóż konto
          </Link>
        </div>
        <div className="mt-5">
          <h4 className="pb-2">Dlaczego warto korzystać z Foxlet</h4>
          <div>
            <div className="d-flex pb-2">
              <span>
                {/* <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjR2NjRIMHoiLz48ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIHN0cm9rZT0iIzAwODJGQSIgZD0iTTQ3LjUgNDguNUg1M2MuOTEzLS4wMSAxLjM0MiAwIDEuOTIxIDBzMS4yNzktMS41OC0uNDIxLTNsLTQtMy41di02Ii8+PHBhdGggc3Ryb2tlPSIjNjQ2NDY0IiBkPSJNMTEuNSAyMC41di0yLjA2Yy0uMDEyLTEuMDQuNDI2LTIuMDQzIDEuMjE2LTIuNzgzLjc5LS43NCAxLjg2Ni0xLjE1NyAyLjk5LTEuMTU3aDMwLjU4OWE0LjM3IDQuMzcgMCAwIDEgMi45NzYgMS4xMzljLjc5LjczMSAxLjIzMSAxLjcyNCAxLjIyOSAyLjc1OFYyMC41TTUwLjUgMzYuNXYtNCIvPjxwYXRoIHN0cm9rZT0iIzk0OTQ5NCIgZD0iTTExLjUgMzJ2My41Ii8+PHBhdGggc3Ryb2tlPSIjNjQ2NDY0IiBkPSJNMTQuNSA0Mi41aDMzTTI2LjUgNDUuNWg5Ii8+PHBhdGggc3Ryb2tlPSIjMEZEMkZGIiBkPSJNMTEuNSAzNS41VjQybC0zLjM5NCAzLjUyMmExLjk2OCAxLjk2OCAwIDAgMC0uNDMzIDIuMjI2Yy4zNDEuNzU3LjkzLjc2MiAxLjc5My43NUgzNi41Ii8+PHBhdGggc3Ryb2tlPSIjMDA4MkZBIiBkPSJNMzYgNDguNWgxNSIvPjxwYXRoIHN0cm9rZT0iIzk0OTQ5NCIgZD0iTTYgMjQuNWgxMUg2ek0xMS41IDI5LjVoNU0zLjUgMjkuNWg1Ii8+PHBhdGggc3Ryb2tlPSIjNjQ2NDY0IiBkPSJNNDYuNSAyNC41aDZNNTQuNSAyNC41aDNNNTEuNSAyOC41aDEwTTQ2LjUgMzIuNWg5TTI0LjcwNyAzNS41TDIyIDI3LjY3NGwxOC0uMTc0LTIuNzA3IDh6TTI4LjUgMjJsLTQuMDYgNC42OE0zMyAyMmw0IDUiLz48L2c+PC9nPjwvc3ZnPg=="></img> */}
                <img
                  className="square-54 mx-1 opacity-75"
                  src="/images/komputer_icon.png"
                ></img>
              </span>
              <span className="font-s px-3 my-auto">zamawiaj szybciej</span>
            </div>
            <div className="d-flex pb-2">
              <span>
                {/* <img src="https://assets.x-kom.pl/public-spa/xkom/f9c6c082f8116a0a.svg"></img> */}
                <img
                  className="square-54 m-1 opacity-75"
                  src="/images/ankieta_icon.png"
                ></img>
              </span>
              <span className="font-s px-3 my-auto">
                sprawdzaj poprzednie zamówienia
              </span>
            </div>
            <div className="d-flex pb-2">
              <span>
                {/* <img
                  src="https://assets.x-kom.pl/public-spa/xkom/31d993f64c783c8d.svg"
                  alt=""
                /> */}
                <img
                  className="square-54 m-1 opacity-75"
                  src="/images/lupa_icon.png"
                ></img>
              </span>
              <span className="font-s px-3 my-auto">
                śledź status zamówienia
              </span>
            </div>
            <div className="d-flex pb-2">
              <span className="mr-4">
                {/* <img src="https://assets.x-kom.pl/public-spa/xkom/a72fe3e39b797784.svg"></img> */}
                <img
                  className="square-54 m-1 opacity-75"
                  src="/images/sale_icon.png"
                ></img>
              </span>
              <span className="font-s px-3 my-auto">
                korzystaj z rabatów i promocji
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default LoginPage;
