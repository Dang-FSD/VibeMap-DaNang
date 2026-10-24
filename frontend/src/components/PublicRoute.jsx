import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Component dành riêng cho khách (chưa đăng nhập).
 * Nếu đã có token đăng nhập rồi, tự động chuyển hướng vào /dashboard.
 */
export default function PublicRoute({ children }) {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
