import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/EmployeSidebar';
import ProductList from './pages/products/ProductList';
import AddProduct from './pages/products/AddProduct';
// import { Routes, Route, Link } from 'react-router-dom';
import EditProduct from './pages/products/EditProduct';
import Dashboard from './pages/EmployeDashboard';
import CustomerList from './pages/customers/CustomerList';
import AddCustomer from './pages/customers/AddCustomer';
import EditCustomer from './pages/customers/EditCustomer';
import TransactionList from './pages/transactions/TransactionList';
import TransactionDetails from './pages/transactions/TransactionDetails';
import AddTransaction from './pages/transactions/AddTransaction';
import AuthProvider from "./provider/authProvider";
import Routes from './routes';
import { HeroUIProvider } from '@heroui/react';

function App() {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </HeroUIProvider>
  );
}

export default App;
