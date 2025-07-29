import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, ChevronUp, Calendar, FileText, Image, Clock } from 'lucide-react'

const CreationItem = ({item}) => {
    const [expanded, setExpanded] = useState(false)

    const getTypeIcon = (type) => {
        switch(type) {
            case 'image':
                return <Image className='w-4 h-4' />
            default:
                return <FileText className='w-4 h-4' />
        }
    }

    const getTypeColor = (type) => {
        switch(type) {
            case 'image':
                return 'bg-purple-100 text-purple-700 border-purple-200'
            case 'article':
                return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'blog':
                return 'bg-green-100 text-green-700 border-green-200'
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

  return (
    <div className='bg-white border border-gray-200 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden'>
        <div 
            onClick={() => setExpanded(!expanded)} 
            className='p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200'
        >
            <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2'>
                        {item.prompt}
                    </h3>
                    <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <div className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4' />
                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>{new Date(item.created_at).toLocaleTimeString()}</span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                        <span>{item.type}</span>
                    </div>
                    <button className='p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                        {expanded ? <ChevronUp className='w-5 h-5 text-gray-500' /> : <ChevronDown className='w-5 h-5 text-gray-500' />}
                    </button>
                </div>
            </div>
        </div>
        
        {expanded && (
            <div className='border-t border-gray-100 bg-gray-50'>
                <div className='p-6'>
                    {item.type === 'image' ? (
                        <div className='space-y-4'>
                            <h4 className='font-medium text-gray-900'>Generated Image</h4>
                            <div className='bg-white rounded-lg p-4 shadow-inner'>
                                <img 
                                    src={item.content} 
                                    alt="Generated content" 
                                    className='w-full max-w-md mx-auto rounded-lg shadow-soft'
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            <h4 className='font-medium text-gray-900'>Generated Content</h4>
                            <div className='bg-white rounded-lg p-6 shadow-inner max-h-96 overflow-y-auto'>
                                <div className='prose prose-sm max-w-none text-gray-700'>
                                    <Markdown>{item.content}</Markdown>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default CreationItem