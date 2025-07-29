import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, File, Hash, House, Image, LogOut, Scissors, SquarePen, Users, Sparkles, Crown, Settings } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const navItems = [
    {to: '/ai', label: 'Dashboard', Icon: House, description: 'Overview & Analytics'},
    {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen, description: 'AI-powered writing'},
    {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash, description: 'Generate catchy titles'},
    {to: '/ai/generate-image', label: 'Generate Images', Icon: Image, description: 'Create stunning visuals'},
    {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser, description: 'Clean image backgrounds'},
    {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors, description: 'Edit images seamlessly'},
    {to: '/ai/review-resume', label: 'Review Resume', Icon: File, description: 'AI resume analysis'},
    {to: '/ai/community', label: 'Community', Icon: Users, description: 'Connect with creators'},
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!user) return null;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className='fixed inset-0 bg-black/20 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center space-x-3 mb-6'>
            <img className="w-10 h-10" src={assets.logo} alt="logo" />
            <div className='flex items-center space-x-1'>
              <Sparkles className='w-5 h-5 text-primary animate-pulse-slow'/>
              <span className='text-lg font-semibold text-gray-900'>AI Studio</span>
            </div>
          </div>
          
          {/* User profile */}
          <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-xl'>
            <img 
              src={user.imageUrl} 
              alt="user avatar" 
              className='w-12 h-12 rounded-full ring-2 ring-primary/20' 
            />
            <div className='flex-1 min-w-0'>
              <h3 className='text-sm font-semibold text-gray-900 truncate'>{user.fullName}</h3>
              <div className='flex items-center space-x-1'>
                <Crown className='w-3 h-3 text-yellow-500'/>
                <span className='text-xs text-gray-600'>
                  <Protect plan='premium' fallback='Free'>Premium</Protect> Plan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
          {navItems.map(({ to, label, Icon, description }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group flex items-start space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-medium' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                  <div className='flex-1 min-w-0'>
                    <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-primary'}`}>
                      {label}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {description}
                    </div>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className='p-4 border-t border-gray-200 space-y-2'>
          <button 
            onClick={openUserProfile}
            className='w-full flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200'
          >
            <Settings className='w-5 h-5 text-gray-400' />
            <span className='font-medium'>Settings</span>
          </button>
          
          <button 
            onClick={signOut}
            className='w-full flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200'
          >
            <LogOut className='w-5 h-5 text-gray-400' />
            <span className='font-medium'>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar