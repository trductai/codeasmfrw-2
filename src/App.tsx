import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // Không cần import BrowserRouter ở đây nữa
import ClientLayout from './layouts/client';
import AdminLayout from './layouts/admin';
import ProductAdd from './components/admin/productadd';
import ProductEdit from './components/admin/productedit';
import ProductList from './components/admin/productlist';
import HomeClient from './components/client/home';
import Category from './components/client/category';
import Login from './components/client/login';
import ListBest from './components/admin/best';
import Details from './components/client/Detail';
import EditBest from './components/admin/EditBest';
import ListAdd from './components/admin/listadd';
import Register from './components/client/register';
import PrivateRoute from './components/routes/PrivateRoute';
import LoginAdmin from './components/admin/login';
import RegisterAdmin from './components/admin/register';

function App() {
  return (
    <Routes>
      {/* Client Routes */}
      <Route path="/" element={<ClientLayout />}>
        <Route path="/" element={<HomeClient />} />
        <Route path="category" element={<Category />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="detail/:id" element={<Details />} />
      </Route>

      {/* Admin Routes - Protected by PrivateRoute */}
      <Route path="/admin" element={<PrivateRoute component={AdminLayout} />}>
        <Route path="product-list" element={<ProductList />} />
        <Route path="product-add" element={<ListAdd />} />
        <Route path="product-edit/:id" element={<ProductEdit />} />
        <Route path="productlist_bestselling" element={<ListBest />} />
        <Route path="best-edit/:id" element={<EditBest />} />
        <Route path="best-add" element={<ProductAdd />} />
        <Route path="category" element={<Category />} />
        <Route path="login" element={<LoginAdmin />} />
        <Route path="register" element={<RegisterAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
