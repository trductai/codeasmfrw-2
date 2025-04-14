import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate từ react-router-dom

const AdminHeader = () => {
  const navigate = useNavigate();  // Khởi tạo hook useNavigate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Kiểm tra token khi component được render
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Xoá token khỏi localStorage
    localStorage.removeItem('token');
    
    // Chuyển hướng về trang đăng nhập
    navigate('/login');
  };

  return (
    <header className='bg-white w-full shadow-md flex p-4 relative z-50'>
        <div className='logo w-1/5'>Ngocnv34</div>
        <div className='right-header w-4/5 flex justify-between'>
            <form>
                <input className='border rounded-md w-[350px] px-2 py-1' type='text' placeholder='Tìm kiếm'/>
            </form>
            <ul>
                <li>Xin chào admin</li>
                {/* Hiển thị nút đăng xuất nếu người dùng đã đăng nhập */}
                {isAuthenticated && (
                  <li>
                    <button 
                      className='text-red-500 hover:text-red-700'
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </li>
                )}
            </ul>
        </div>
    </header>
  );
};

export default AdminHeader;
