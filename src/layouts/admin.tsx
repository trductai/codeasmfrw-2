import React from 'react'
import AdminHeader from '../components/admin/header'
import AdminSidebar from '../components/admin/sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <main className='bg-[#f6f9ff]'>
        <AdminHeader/>
        <div className='flex'>
        <AdminSidebar/>
        <div className='content w-4/5 p-6'>
            <div className='bg-white w-full p-5'>
            <Outlet/>
            </div>
        </div>
        </div>
    </main>
  )
}

export default AdminLayout