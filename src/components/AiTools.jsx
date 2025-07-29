import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowRight, Sparkles } from 'lucide-react'

export const AiTools = () => {
    const navigate = useNavigate()
    const {user} = useUser()
  return (
    <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Section Header */}
            <div className='text-center mb-12'>
                <div className='inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6'>
                    <Sparkles className='w-4 h-4'/>
                    <span className='text-sm font-medium'>AI-Powered Tools</span>
                </div>
                <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                    Create with{' '}
                    <span className='relative'>
                        <span className='relative z-10'>Confidence</span>
                        <div className='absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full'></div>
                    </span>
                </h2>
                <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                    From first draft to final design, our AI tools help you craft stunning content — faster, easier, and smarter than ever before.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {AiToolsData.map((tool, index) => (
    <div
      key={index}
      className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:-translate-y-2"
      onClick={() => user && navigate(tool.path)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon */}
      <div className="relative z-10">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow group-hover:shadow-lg transition"
          style={{
            background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
          }}
        >
          <tool.Icon className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {tool.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {tool.description}
        </p>
        <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
          <span className="text-sm">Get Started</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  ))}
</div>


            {/* Bottom CTA */}
            <div className='text-center mt-12'>
                <div className='inline-flex items-center gap-2 text-gray-600'>
                    <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'>
                        <Sparkles className='w-4 h-4 text-primary'/>
                    </div>
                    <span className='text-sm font-medium'>All tools powered by advanced AI</span>
                </div>
            </div>
        </div>
    </section>
  )
}
