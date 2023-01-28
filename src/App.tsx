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
import EmployeeForm from './components/AccountPage/EmployeeForm';
import GuardSession from './components/GuardSession';
import SupplierForm from './components/AssortmentPage/SupplierView/SupplierForm';
import SupplierView from './components/AssortmentPage/SupplierView';
import PalletView from './components/AssortmentPage/PalletView';
import StockView from './components/AssortmentPage/StockView';
import ProductView from './components/AssortmentPage/ProductView';
import PalletForm from './components/AssortmentPage/PalletView/PalletCreate';
import PalletDetails from './components/AssortmentPage/PalletView/PalletDetails';

import dayjs from 'dayjs';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CompanyView from './components/AccountPage/CompanyForm';
import ClientView from './components/AssortmentPage/ClientsView';
import OrderView from './components/AssortmentPage/OrderView';

require('dayjs/locale/pl');
dayjs.locale('pl');
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
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
                  <Route path="company" element={<CompanyView />} />
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
                  <Route
                    path="pallets/:id_pallet"
                    element={<PalletDetails />}
                  />
                  <Route path="stock" element={<StockView />} />
                  <Route path="products" element={<ProductView />} />
                  <Route path="suppliers" element={<SupplierView />} />
                  <Route path="clients" element={<ClientView />} />
                  <Route path="orders" element={<OrderView />} />
                  {/* <Route path="add-pallet" element={<PalletForm />} /> */}
                  {/* <Route path="add-supplier" element={<SupplierForm />} /> */}
                  <Route index element={<PalletView />} />
                </Route>

                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                {/* <Route path="assortment" element={<AssortmentPage />} /> */}
                <Route path="*" element={<HomePage />} />
              </Route>
            </Routes>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
