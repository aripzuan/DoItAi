import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, Sparkles, Crown, Zap, Menu, X } from 'lucide-react';
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();
    const {openSignIn} = useClerk();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Check if we're on the dashboard page or pricing page
    const isDashboard = location.pathname.startsWith('/ai');
    const isPricing = location.pathname === '/pricing';
    const shouldHideWelcome = isDashboard || isPricing;

  return (
    <nav className='fixed z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'>
        <div className='px-2 sm:px-4'>
            <div className='flex justify-between items-center py-4'>
                <div className='flex items-center cursor-pointer group' onClick={()=> navigate('/')}>
                    <img src={assets.logo} alt="logo" className='h-20 w-auto transition-transform group-hover:scale-110'/>
                </div>
                
                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center space-x-6'>
                    {user ? (
                        <button 
                            onClick={() => navigate('/ai')}
                            className='flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200 cursor-pointer'
                        >
                            <Zap className='w-4 h-4' />
                            <span className='font-medium'>Dashboard</span>
                        </button>
                    ) : null}
                    <button 
                        onClick={() => navigate('/pricing')}
                        className='flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200 cursor-pointer'
                    >
                        <Crown className='w-4 h-4' />
                        <span className='font-medium'>Pricing</span>
                    </button>
                    {user ? (
                        <div className='flex items-center space-x-4 ml-8'>
                            {!shouldHideWelcome && (
                                <div className='block text-sm text-gray-600'>
                                    Welcome back, <span className='font-medium text-gray-900'>{user.firstName}</span>
                                </div>
                            )}
                            <UserButton 
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <button 
                            onClick={openSignIn} 
                            className='group flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer gradient-primary text-white px-6 py-3 shadow-medium hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300'
                        >
                            <span>Get Started</span>
                            <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform'/>
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center space-x-4'>
                    {user && (
                        <UserButton 
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                                }
                            }}
                        />
                    )}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className='p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                    >
                        {isMobileMenuOpen ? (
                            <X className='w-6 h-6 text-gray-600' />
                        ) : (
                            <Menu className='w-6 h-6 text-gray-600' />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='md:hidden border-t border-gray-200 bg-white'>
                    <div className='px-4 py-4 space-y-4'>
                        {user ? (
                            <>
                                <button 
                                    onClick={() => {
                                        navigate('/ai');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className='flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                                >
                                    <Zap className='w-5 h-5 text-gray-600' />
                                    <span className='font-medium text-gray-900'>Dashboard</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        navigate('/pricing');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className='flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                                >
                                    <Crown className='w-5 h-5 text-gray-600' />
                                    <span className='font-medium text-gray-900'>Pricing</span>
                                </button>
                                {!shouldHideWelcome && (
                                    <div className='p-3 text-sm text-gray-600 border-t border-gray-100'>
                                        Welcome back, <span className='font-medium text-gray-900'>{user.firstName}</span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <button 
                                onClick={() => {
                                    openSignIn();
                                    setIsMobileMenuOpen(false);
                                }}
                                className='w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-200'
                            >
                                Get Started
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar