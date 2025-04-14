import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = localStorage.getItem('token');  // Kiểm tra nếu có token trong localStorage

  if (!isAuthenticated) {
    return <Navigate to="/login" />;  // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
