import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Component bảo vệ các route riêng tư (Private/Protected Routes).
 * Nếu chưa đăng nhập (không có token trong localStorage),
 * tự động chuyển hướng người dùng về trang /login.
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Lưu lại vị trí trang hiện tại vào state để sau khi login xong có thể redirect lại nếu muốn
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
