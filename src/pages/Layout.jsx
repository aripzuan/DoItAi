import {useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X, Sparkles, Crown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {user} = useUser()
  return user ?  (
    <div className='flex h-screen bg-gray-50'>
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Main content */}
        <div className='flex-1 flex flex-col overflow-hidden'>
            {/* Top navigation */}
            <nav className='bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm'>
                <div className='flex items-center space-x-4'>
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                    >
                        {sidebarOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                    </button>
                    <div className='flex items-center space-x-2 cursor-pointer group' onClick={()=> navigate('/')}>
                        <img className="w-8 h-8 transition-transform group-hover:scale-105" src={assets.logo} alt="logo" />
                    </div>
                </div>
                
                <div className='flex items-center space-x-4'>
                    <button 
                        onClick={() => navigate('/pricing')}
                        className='hidden sm:flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200'
                    >
                        <Crown className='w-4 h-4' />
                        <span className='font-medium'>Pricing</span>
                    </button>
                    <div className='hidden sm:flex items-center space-x-3'>
                        <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center'>
                            <span className='text-white text-sm font-semibold'>{user.firstName?.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Page content */}
            <main className='flex-1 overflow-auto bg-gray-50'>
                <div className='p-6'>
                    <Outlet />
                </div>
            </main>
        </div>
    </div>
  ) : (
    <div className='min-h-screen bg-gradient-primary flex items-center justify-center p-4'>
        <div className='bg-white rounded-2xl shadow-large p-8 max-w-md w-full'>
            <div className='text-center mb-8'>
                <div className='flex items-center justify-center space-x-2 mb-4'>
                    <img className="w-12 h-12" src={assets.logo} alt="logo" />
                </div>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>Welcome Back</h2>
                <p className='text-gray-600'>Sign in to access your AI tools</p>
            </div>
            <SignIn />
        </div>
    </div>
  )
}

export default Layout