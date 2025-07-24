import {useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {user} = useUser()
  return user ?  (
    <div className='flex flex-col items-start justify-start h-screen'>
        <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
          <img className="w-28 sm:w-30 cursor-pointer" src={assets.logo} alt="" onClick={()=> navigate('/')}/>
          {
            sidebarOpen ? <X onClick={()=> setSidebarOpen(false)} className='w-6 h-6 text-gray-600 sm:hidden'/>
            : <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=> setSidebarOpen(true)}/>
          }
        </nav>
        <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className='flex-1 bg-[#F4F7FB]'>
            <Outlet />
          </div>
        </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout