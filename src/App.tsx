import React from 'react';
import './App.css'
import { Routes, useRoutes } from 'react-router-dom';
import ClientLayout from './layouts/client';
import AdminLayout from './layouts/admin';
import ProductAdd from './components/admin/productadd';
import ProductEdit from './components/admin/productedit';
import ProductList from './components/admin/productlist';
import HomeClient from './components/client/home';
import { BiCategory } from 'react-icons/bi';
import Category from './components/client/category';
import Login from './components/client/login';
import ListBest from './components/admin/best';
function App() {
  const routes = useRoutes([
      {path:"/",element:<ClientLayout/>,children:[
        {path:"",element:<HomeClient/>},
        {path:"category",element:<Category/>},
        {path:"login",element:<Login/>},

      ]},
      {path:"/dashboard",element:<AdminLayout/>,children:[
        {path:"product-list",element:<ProductList/>},
        {path:"product-add",element:<ProductAdd/>},
        {path:"product-edit/:id",element:<ProductEdit/>},
        {path:"productlist_bestselling",element:<ListBest/>},
      ]}
  ]) 
  return routes     
}

export default App
