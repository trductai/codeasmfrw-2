import React, { useState, useEffect } from 'react';
import { FaRegUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientHeader = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State cho từ khóa tìm kiếm
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi tải trang
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus); // Cập nhật trạng thái đăng nhập
  }, []);

  // Hàm xử lý đăng nhập/đăng xuất
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Xóa token và thông tin đăng nhập khỏi localStorage khi đăng xuất
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token'); // Xóa token
      setIsLoggedIn(false); // Cập nhật lại trạng thái đăng nhập
    } else {
      // Cập nhật trạng thái khi người dùng đăng nhập (thường sẽ lưu token tại đây)
      localStorage.setItem('isLoggedIn', 'true');
      // Giả sử sau khi đăng nhập, token sẽ được lưu vào localStorage
      localStorage.setItem('token', 'your-token-here');
      setIsLoggedIn(true); // Cập nhật lại trạng thái đăng nhập
    }
  };

  // Hàm xử lý thay đổi tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl font-bold">Exclusive</h1>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-6 text-gray-700">
              <li className="relative pb-1 hover:border-b-2 hover:border-black transition-all">
                <Link to="/">Home</Link>
              </li>
              <li className="relative pb-1 hover:border-b-2 hover:border-black transition-all">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="relative pb-1 hover:border-b-2 hover:border-black transition-all">
                <Link to="/about">About</Link>
              </li>
              <li className="relative pb-1 hover:border-b-2 hover:border-black transition-all">
                {/* Hiển thị "Login" khi chưa đăng nhập, và "Logout" khi đã đăng nhập */}
                {isLoggedIn ? (
                  <button onClick={handleLoginLogout}>Logout</button>
                ) : (
                  <Link to="/login" onClick={handleLoginLogout}>Login</Link>
                )}
              </li>
            </ul>
          </nav>

          {/* Search & Icons */}
          <div className="flex items-center space-x-4">
            {/* Input Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* User Icon */}
            {isLoggedIn && (
              <FaRegUser className="w-6 h-6 text-gray-700 hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
            )}

            {/* Shopping Cart Icon */}
            <FaShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default ClientHeader;
