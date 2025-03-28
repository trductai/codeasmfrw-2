import React from 'react'
import { FaRegUser, FaSearch, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ClientHeader = () => {
  return (
    <div>
         <div className="bg-black text-white text-center py-2 text-sm">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#" className="underline">ShopNow</a>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl font-bold">Exclusive</h1>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-6 text-gray-700">
              <li className="relative pb-1 hover:border-b-2 hover:border-black transition-all"><a href="/">Home</a></li>
              <li className="relative pb-1 hover:border-b-2 hover:border-black transition-all"><a href="#">Contact</a></li>
              <li className="relative pb-1 hover:border-b-2 hover:border-black transition-all"><a href="#">About</a></li>
              <li className="relative pb-1 hover:border-b-2 hover:border-black transition-all"><a href="/login">Sign In</a></li>
            </ul>
            
          </nav>

          {/* Search & Icons */}
          <div className="flex items-center space-x-4">
      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Search Icon */}
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* User Icon */}
      <FaRegUser className="w-6 h-6 text-gray-700 hover:text-blue-500 transition-colors duration-200 cursor-pointer" />

      {/* Shopping Cart Icon */}
      <FaShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
    </div>
        </div>
        <div className="border-t mt-10"></div>

      </header>
    </div>
  )
}

export default ClientHeader