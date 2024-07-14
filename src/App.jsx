import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import EditProduct from './Components/EditProductComp';
import EditCategory from './Components/EditCategoryComp';
import AddProduct from './Components/AddProduct';
import AddCategory from './Components/AddCategory';
import HomePage from './Home';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CustomersPage from './pages/CustomersPage';
import TransactionPage from './pages/TransactionPage';
import ReportsPage from './pages/ReportsPage';
import InformationPage from './pages/InformationPage';
import AdminLoginPage from './pages/LoginPage';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('auth_token'));

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_id');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className='grid-container'>
        {isAuthenticated && <Header OpenSidebar={OpenSidebar} handleLogout={handleLogout} />}
        {isAuthenticated && <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />}
        <Routes>
          <Route
            path="/admin/login"
            element={<AdminLoginPage onLogin={handleLogin} />}
          />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/Pedit/:id" element={<EditProduct />} />
              <Route path="/Cedit/:id" element={<EditCategory />} />
              <Route path="/Padd" element={<AddProduct />} />
              <Route path="/Cadd" element={<AddCategory />} />
              <Route path="/transaction" element={<TransactionPage />} />
              {/* <Route path="/reports" element={<ReportsPage />} /> */}
              <Route path="/info" element={<InformationPage />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/admin/login" />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
