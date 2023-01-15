import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authAPI from '../../services/auth';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  return (
    <div className="content-min-height d-flex justify-content-around align-items-start flex-wrap col-lg-12 col-xl-8 m-auto py-5">
      <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 px-4 border rounded-4 py-4 content-fit-height border-shadow my-4">
        <h3 className="pb-4">Zaloguj się</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            authAPI.register({ email, password, user_name: userName, role });
          }}
        >
          <div className="w-100 mb-3">
            <input
              name="user-name"
              className="form-control font-xs"
              placeholder="Nazwa"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              required
            ></input>
          </div>
          <div className="w-100 mb-3">
            <input
              name="email"
              className="form-control font-xs"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="w-100 mb-3">
            <input
              name="password"
              className="form-control font-xs"
              placeholder="Hasło"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <div className="w-100 mb-3">
            <select
              name="role"
              className="form-control font-xs"
              required
              onChange={e => setRole(e.target.value)}
            >
              <option value="" disabled selected>
                Rola
              </option>
              <option value="employee">Pracownik</option>
              <option value="customer">Klient</option>
            </select>
          </div>

          <Button type="submit" className="w-100 mt-4 button-orange-first">
            Zarejestruj się
          </Button>
        </form>
      </div>
      <aside className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-5 px-4 py-4 content-fit-height">
        <div>
          <h3 className="">Masz konto?</h3>
          <Link to="/login" className="button-orange-second py-1 mt-4 ">
            Zaloguj się
          </Link>
        </div>
        <div className="mt-5">
          <h4 className="pb-2">Dlaczego warto korzystać z Foxlet</h4>
          <div>
            <div className="d-flex pb-2">
              <span>
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjR2NjRIMHoiLz48ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIHN0cm9rZT0iIzAwODJGQSIgZD0iTTQ3LjUgNDguNUg1M2MuOTEzLS4wMSAxLjM0MiAwIDEuOTIxIDBzMS4yNzktMS41OC0uNDIxLTNsLTQtMy41di02Ii8+PHBhdGggc3Ryb2tlPSIjNjQ2NDY0IiBkPSJNMTEuNSAyMC41di0yLjA2Yy0uMDEyLTEuMDQuNDI2LTIuMDQzIDEuMjE2LTIuNzgzLjc5LS43NCAxLjg2Ni0xLjE1NyAyLjk5LTEuMTU3aDMwLjU4OWE0LjM3IDQuMzcgMCAwIDEgMi45NzYgMS4xMzljLjc5LjczMSAxLjIzMSAxLjcyNCAxLjIyOSAyLjc1OFYyMC41TTUwLjUgMzYuNXYtNCIvPjxwYXRoIHN0cm9rZT0iIzk0OTQ5NCIgZD0iTTExLjUgMzJ2My41Ii8+PHBhdGggc3Ryb2tlPSIjNjQ2NDY0IiBkPSJNMTQuNSA0Mi41aDMzTTI2LjUgNDUuNWg5Ii8+PHBhdGggc3Ryb2tlPSIjMEZEMkZGIiBkPSJNMTEuNSAzNS41VjQybC0zLjM5NCAzLjUyMmExLjk2OCAxLjk2OCAwIDAgMC0uNDMzIDIuMjI2Yy4zNDEuNzU3LjkzLjc2MiAxLjc5My43NUgzNi41Ii8+PHBhdGggc3Ryb2tlPSIjMDA4MkZBIiBkPSJNMzYgNDguNWgxNSIvPjxwYXRoIHN0cm9rZT0iIzk0OTQ5NCIgZD0iTTYgMjQuNWgxMUg2ek0xMS41IDI5LjVoNU0zLjUgMjkuNWg1Ii8+PHBhdGggc3Ryb2tlPSIjNjQ2NDY0IiBkPSJNNDYuNSAyNC41aDZNNTQuNSAyNC41aDNNNTEuNSAyOC41aDEwTTQ2LjUgMzIuNWg5TTI0LjcwNyAzNS41TDIyIDI3LjY3NGwxOC0uMTc0LTIuNzA3IDh6TTI4LjUgMjJsLTQuMDYgNC42OE0zMyAyMmw0IDUiLz48L2c+PC9nPjwvc3ZnPg=="></img>
              </span>
              <span className="font-s px-3 my-auto">zamawiaj szybciej</span>
            </div>
            <div className="d-flex pb-2">
              <span>
                <img src="https://assets.x-kom.pl/public-spa/xkom/f9c6c082f8116a0a.svg"></img>
              </span>
              <span className="font-s px-3 my-auto">
                sprawdzaj poprzednie zamówienia
              </span>
            </div>
            <div className="d-flex pb-2">
              <span>
                <img
                  src="https://assets.x-kom.pl/public-spa/xkom/31d993f64c783c8d.svg"
                  alt=""
                />
              </span>
              <span className="font-s px-3 my-auto">
                śledź status zamówienia
              </span>
            </div>
            <div className="d-flex pb-2">
              <span className="mr-4">
                <img src="https://assets.x-kom.pl/public-spa/xkom/a72fe3e39b797784.svg"></img>
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

export default RegisterPage;
