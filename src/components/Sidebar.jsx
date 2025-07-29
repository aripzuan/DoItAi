import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, File, Hash, House, Image, LogOut, Scissors, SquarePen, Users, Sparkles, Crown, Settings, Lock } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const navItems = [
    {to: '/ai', label: 'Dashboard', Icon: House, description: 'Overview & Analytics', premium: false},
    {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen, description: 'AI-powered writing', premium: false},
    {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash, description: 'Generate catchy titles', premium: false},
    {to: '/ai/generate-image', label: 'Generate Images', Icon: Image, description: 'Create stunning visuals', premium: true},
    {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser, description: 'Clean image backgrounds', premium: true},
    {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors, description: 'Edit images seamlessly', premium: true},
    {to: '/ai/review-resume', label: 'Review Resume', Icon: File, description: 'AI resume analysis', premium: true},
    {to: '/ai/community', label: 'Community', Icon: Users, description: 'Connect with creators', premium: false},
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const { getToken } = useAuth();
  const [isPremium, setIsPremium] = useState(null);
  const navigate = useNavigate();

  // Check user's plan status from backend
  useEffect(() => {
    const checkPlan = async () => {
      if (!user) return;
      
      try {
        const { data } = await axios.get('/api/user/get-user-plan', {
          headers: { Authorization: `Bearer ${await getToken()}` }
        });
        
        if (data.success) {
          setIsPremium(data.hasPremium);
        } else {
          setIsPremium(false);
        }
      } catch (error) {
        console.error('Error checking plan:', error);
        setIsPremium(false);
      }
    };

    checkPlan();
  }, [user, getToken]);

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
          <div className='flex items-center justify-center mb-6'>
            <img 
              className="w-16 h-16 cursor-pointer transition-transform hover:scale-105" 
              src={assets.logo} 
              alt="logo" 
              onClick={() => {
                navigate('/');
                setSidebarOpen(false);
              }}
            />
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
                  {isPremium ? 'Premium' : 'Free'} Plan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
          {navItems.map(({ to, label, Icon, description, premium }) => {
            const isLocked = premium && !isPremium;
            
            return (
              <div key={to} className='relative'>
                <NavLink
                  to={isLocked ? '#' : to}
                  end={to === '/ai'}
                  onClick={(e) => {
                    if (isLocked) {
                      e.preventDefault();
                      navigate('/pricing'); // Redirect to upgrade page
                      return;
                    }
                    setSidebarOpen(false);
                  }}
                  className={({ isActive }) =>
                    `group flex items-start space-x-3 p-3 rounded-xl transition-all duration-200 ${
                      isLocked 
                        ? 'opacity-60 cursor-not-allowed bg-gray-50' 
                        : isActive 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-medium' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className='relative'>
                        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          isLocked 
                            ? 'text-gray-400' 
                            : isActive 
                              ? 'text-white' 
                              : 'text-gray-400 group-hover:text-primary'
                        }`} />
                        {isLocked && (
                          <Lock className='w-3 h-3 text-gray-400 absolute -top-1 -right-1' />
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className={`font-medium flex items-center space-x-2 ${
                          isLocked 
                            ? 'text-gray-500' 
                            : isActive 
                              ? 'text-white' 
                              : 'text-gray-900 group-hover:text-primary'
                        }`}>
                          <span>{label}</span>
                          {isLocked && (
                            <span className='text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full'>
                              Premium
                            </span>
                          )}
                        </div>
                        <div className={`text-xs ${
                          isLocked 
                            ? 'text-gray-400' 
                            : isActive 
                              ? 'text-white/80' 
                              : 'text-gray-500'
                        }`}>
                          {description}
                        </div>
                      </div>
                    </>
                  )}
                </NavLink>
                
                {/* Locked tooltip */}
                {isLocked && (
                  <div className='absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10'>
                    Upgrade to Premium to unlock
                    <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900'></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Premium Upgrade Banner for Free Users */}
        {/* Premium Upgrade Banner for Free Users */}
        {isPremium === false && (
          <div className='mx-4 mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl'>
            <div className='flex items-center space-x-3 mb-3'>
              <Crown className='w-5 h-5 text-yellow-600' />
              <span className='text-sm font-semibold text-yellow-800'>Upgrade to Premium</span>
            </div>
            <p className='text-xs text-yellow-700 mb-3'>
              Unlock unlimited access to all AI tools including image generation, background removal, and resume review.
            </p>
            <Link
              to="/pricing"
              className='w-full block text-center bg-primary hover:bg-primary-dark text-white text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-glow'
            >
              Upgrade Now
            </Link>
          </div>
        )}


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