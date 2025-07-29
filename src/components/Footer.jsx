import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'

const Footer = () => {
    const navigate = useNavigate();
  return (
    <footer className="w-full bg-gradient-to-b from-[#1B004D] to-[#2E0A6F] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-6">
                <img 
                    alt="DoIt.AI Logo" 
                    className="h-12 w-auto cursor-pointer transition-transform hover:scale-105"
                    onClick={() => navigate('/')}
                    src={assets.logo} 
                />
            </div>
            <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-gray-200">
                Empowering creators worldwide with the most advanced AI content creation tools. Transform your ideas into reality.
            </p>
        </div>
        <div className="border-t border-[#3B1A7A]">
            <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal text-gray-300">
                <div className="flex items-center justify-center space-x-2">
                    <span>Made with</span>
                    <Heart className="w-4 h-4 text-red-400 fill-current" />
                    <span>by Ariff Ridzuan</span>
                    <span className="mx-2">•</span>
                    <span>© 2025 DoIt.AI. All rights reserved.</span>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer