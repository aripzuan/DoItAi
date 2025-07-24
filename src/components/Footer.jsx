import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
  return (
        <footer className="bg-[url(/gradientBackground.jpg)]">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <img alt="logo" className='h-24 w-auto sm:h-28 cursor-pointer' onClick={()=> navigate('/')}
                        src={assets.logo} />
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Empowering creators worldwide with the most advanced AI content creation tools. Transform your ideas into reality.
                </p>
            </div>
            <div className="border-t">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="">Ariff Ridzuan</a> ©2025. All rights reserved.
                </div>
            </div>
        </footer>
  )
}

export default Footer