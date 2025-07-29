import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Heart, Mail, Twitter, Linkedin, Github } from 'lucide-react'

const Footer = () => {
    const navigate = useNavigate();
  return (
    <footer className="relative bg-gradient-dark text-white overflow-hidden">
        {/* Background pattern */}
        <div className='absolute inset-0 opacity-10' style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating elements */}
        <div className='absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse-slow'></div>
        <div className='absolute bottom-20 left-20 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-pulse-slow' style={{animationDelay: '1s'}}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main footer content */}
            <div className="py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Brand section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <img 
                                alt="logo" 
                                className='h-16 w-auto cursor-pointer transition-transform hover:scale-105' 
                                onClick={()=> navigate('/')}
                                src={assets.logo} 
                            />
                            <div className='flex items-center space-x-1'>
                                <Sparkles className='w-5 h-5 text-primary'/>
                                <span className='text-lg font-semibold'>AI Studio</span>
                            </div>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-8">
                            Empowering creators worldwide with the most advanced AI content creation tools. Transform your ideas into reality with cutting-edge technology.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Documentation</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">API</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Help Center</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Contact Us</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Status</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Community</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2 text-gray-400">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-400 fill-current" />
                        <span>by Ariff Ridzuan</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                        <span>© 2025. All rights reserved.</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer