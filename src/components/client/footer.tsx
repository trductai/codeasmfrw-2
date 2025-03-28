import React from 'react'

const ClientFooter = () => {
  return (
    <div> <footer className="bg-black text-white py-10">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-6 md:px-12">
      {/* Exclusive Section */}
      <div>
        <h2 className="text-xl font-bold">Exclusive</h2>
        <p className="mt-3">Subscribe</p>
        <p className="text-gray-400">Get 10% off your first order</p>
        <div className="mt-3 flex border border-gray-500 rounded-lg overflow-hidden">
          <input type="email" placeholder="Enter your email" className="bg-black text-white px-3 py-2 flex-1 outline-none" />
          <button className="bg-white text-black px-3 py-2">➤</button>
        </div>
      </div>
      
      {/* Support Section */}
      <div>
        <h2 className="text-xl font-bold">Support</h2>
        <p className="text-gray-400 mt-3">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
        <p className="text-gray-400">exclusive@gmail.com</p>
        <p className="text-gray-400">+88015-88888-9999</p>
      </div>
      
      {/* Account Section */}
      <div>
        <h2 className="text-xl font-bold">Account</h2>
        <ul className="mt-3 space-y-2">
          <li>My Account</li>
          <li>Login / Register</li>
          <li>Cart</li>
          <li>Wishlist</li>
          <li>Shop</li>
        </ul>
      </div>
      
      {/* Quick Link Section */}
      <div>
        <h2 className="text-xl font-bold">Quick Link</h2>
        <ul className="mt-3 space-y-2">
          <li>Privacy Policy</li>
          <li>Terms Of Use</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </div>
      
      {/* Download App Section */}
      <div>
        <h2 className="text-xl font-bold">Download App</h2>
        <p className="text-gray-400 mt-3">Save $3 with App New User Only</p>
        <div className="flex gap-2 mt-3">
          <img src="/public/img/Qr Code.png" alt="QR Code" className="w-16 h-16" />
          <div className="flex flex-col gap-2">
            <img src="/public/img/google.png" alt="Google Play" className="w-28" />
            <img src="/public/img/apple.png" alt="App Store" className="w-28" />
          </div>
        </div>
        <div className="flex gap-4 mt-4 text-xl">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin"></i>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
      © Copyright Rimel 2022. All rights reserved
    </div>
  </footer></div>
  )
}

export default ClientFooter