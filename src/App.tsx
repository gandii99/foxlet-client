import { AuthProvider } from './providers/provider';
import React from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssortmentPage from './components/AssortmentPage';
import './App.css';
import AccountPage from './components/AccountPage';
import UserForm from './components/AccountPage/UserForm';
import CompanyForm from './components/AccountPage/CompanyForm';
import EmployeeForm from './components/AccountPage/EmployeeForm';
import GuardSession from './components/GuardSession';
import SupplierForm from './components/AssortmentPage/SupplierView/SupplierForm';
import SupplierView from './components/AssortmentPage/SupplierView';
import PalletView from './components/AssortmentPage/PalletView';
import ProductView from './components/AssortmentPage/ProductView';
import PalletForm from './components/AssortmentPage/PalletView/PalletForm';
import PalletDetails from './components/AssortmentPage/PalletView/PalletDetails';
import dayjs from 'dayjs';
require('dayjs/locale/pl');
dayjs.locale('pl');

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="account"
                element={
                  <GuardSession>
                    <AccountPage />
                  </GuardSession>
                }
              >
                <Route path="user" element={<UserForm />} />
                <Route path="employee" element={<EmployeeForm />} />
                <Route path="company" element={<CompanyForm />} />
                <Route index element={<UserForm />} />
              </Route>
              <Route
                path="assortment"
                element={
                  <GuardSession>
                    <AssortmentPage />
                  </GuardSession>
                }
              >
                <Route path="pallets" element={<PalletView />} />
                <Route path="pallets/:id_pallet" element={<PalletDetails />} />
                <Route path="products" element={<ProductView />} />
                <Route path="suppliers" element={<SupplierView />} />
                <Route path="add-pallet" element={<PalletForm />} />
                <Route path="add-supplier" element={<SupplierForm />} />
                <Route index element={<PalletView />} />
              </Route>

              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              {/* <Route path="assortment" element={<AssortmentPage />} /> */}
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
