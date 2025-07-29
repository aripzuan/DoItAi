import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { assets } from '../assets/assets';

const Hero = () => {
    const navigate = useNavigate();

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
        {/* Background with animated gradient */}
        <div className='absolute inset-0 gradient-primary opacity-90'></div>
        <div className='absolute inset-0 opacity-30' style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating elements */}
        <div className='absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse-slow'></div>
        <div className='absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse-slow' style={{animationDelay: '1s'}}></div>
        <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse-slow' style={{animationDelay: '2s'}}></div>

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            {/* Logo */}
            <div className='mb-8 animate-fade-in-up'>
                <img src={assets.logo} alt="DoIt.AI Logo" className='h-24 w-auto mx-auto filter brightness-0 invert' />
            </div>

            {/* Badge */}
            <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up' style={{animationDelay: '0.1s'}}>
                <Sparkles className='w-4 h-4 text-white'/>
                <span className='text-sm font-medium text-white'>Powered by Advanced AI</span>
            </div>

            {/* Main heading */}
            <h1 className='text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6 animate-fade-in-up' style={{animationDelay: '0.3s'}}>
                Bring your ideas to life with{' '}
                <span className='relative'>
                    <span className='relative z-10'>next-gen AI tools</span>
                    <div className='absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80'></div>
                </span>
            </h1>

            {/* Subtitle */}
            <p className='text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up' style={{animationDelay: '0.5s'}}>
                Design, write, and automate effortlessly — all in one intelligent platform built for creators who want to push boundaries.
            </p>

            {/* CTA Button */}
            <div className='flex justify-center items-center mb-12 animate-fade-in-up' style={{animationDelay: '0.7s'}}>
                <button 
                    onClick={()=> navigate('/ai')} 
                    className='group flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-large hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300'
                >
                    <Zap className='w-5 h-5'/>
                    Start Creating Now
                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform'/>
                </button>
            </div>

            {/* Stats */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80 animate-fade-in-up' style={{animationDelay: '0.9s'}}>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-white/10 rounded-full flex items-center justify-center'>
                        <Target className='w-6 h-6'/>
                    </div>
                    <div className='text-left'>
                        <div className='text-2xl font-bold text-white'>1000+</div>
                        <div className='text-sm'>Active Creators</div>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-white/10 rounded-full flex items-center justify-center'>
                        <Sparkles className='w-6 h-6'/>
                    </div>
                    <div className='text-left'>
                        <div className='text-2xl font-bold text-white'>50K+</div>
                        <div className='text-sm'>Projects Created</div>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-white/10 rounded-full flex items-center justify-center'>
                        <Zap className='w-6 h-6'/>
                    </div>
                    <div className='text-left'>
                        <div className='text-2xl font-bold text-white'>99%</div>
                        <div className='text-sm'>Satisfaction Rate</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
            <div className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center'>
                <div className='w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse'></div>
            </div>
        </div>
    </div>
  )
}

export default Hero