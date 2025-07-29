import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react';
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const {openSignIn} = useClerk();

  return (
    <nav className='fixed z-50 w-full glass border-b border-white/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center py-4'>
                <div className='flex items-center space-x-2 cursor-pointer group' onClick={()=> navigate('/')}>
                    <img src={assets.logo} alt="logo" className='h-12 w-auto transition-transform group-hover:scale-105'/>
                    <div className='hidden sm:flex items-center space-x-1'>
                        <Sparkles className='w-4 h-4 text-primary animate-pulse-slow'/>
                        <span className='text-sm font-medium text-gray-700'>AI Studio</span>
                    </div>
                </div>
                
                <div className='flex items-center space-x-4'>
                    {user ? (
                        <div className='flex items-center space-x-3'>
                            <div className='hidden sm:block text-sm text-gray-600'>
                                Welcome back, <span className='font-medium text-gray-800'>{user.firstName}</span>
                            </div>
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
            </div>
        </div>
    </nav>
  )
}

export default Navbar