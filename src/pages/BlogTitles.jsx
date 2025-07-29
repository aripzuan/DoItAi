import { Sparkles, Hash } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food']
  
    const [selectedCategory, setSelectedCategory] = useState('General')
    const [input, setInput] = useState('')

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const {getToken} = useAuth();
  
    const onSubmitHandler = async (e)=> {
      e.preventDefault();
      try{
        setLoading(true);
        const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}.`;
        const {data} = await axios.post('/api/ai/blog-titles', {prompt}, {headers: {Authorization: `Bearer ${await getToken()}`}});

        if (data.success) {
          setContent(data.content);
        } else {
          toast.error(data.message);
        }
      } catch(err) {
        toast.error(err.message);
      }
      setLoading(false);
    } 

  return (
    <div className='h-full overflow-y-auto p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* left col */}
          <form onSubmit={onSubmitHandler} className='w-full bg-white rounded-2xl shadow-soft border border-gray-200 p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <Sparkles className='w-6 h-6 text-[#8E37EB]'/>
              <h1 className='text-xl font-semibold'>AI Title Generator</h1>
            </div>
            
            <div className='space-y-6'>
              <div>
                <p className='text-sm font-medium text-gray-700 mb-2'>Keyword</p>
                <input 
                  onChange={(e)=>setInput(e.target.value)} 
                  value={input} 
                  type="text" 
                  className='w-full p-3 outline-none text-sm rounded-xl border border-gray-300 focus:border-[#8E37EB] focus:ring-2 focus:ring-[#8E37EB]/20 transition-all' 
                  placeholder='The future of artificial intelligence is...' 
                  required 
                />
              </div>

              <div>
                <p className='text-sm font-medium text-gray-700 mb-3'>Category</p>
                <div className='flex gap-2 flex-wrap'>
                  {blogCategories.map((item)=> (
                    <span 
                      onClick={()=> setSelectedCategory(item)} 
                      className={`text-sm px-4 py-2 border rounded-full cursor-pointer transition-all ${
                        selectedCategory === item 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' 
                          : 'text-gray-500 border-gray-300 hover:border-gray-400'
                      }`} 
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                disabled={loading} 
                className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-6 py-3 text-sm rounded-xl font-medium hover:shadow-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? (
                  <span className='w-5 h-5 rounded-full border-2 border-t-transparent animate-spin'></span>
                ) : (
                  <Hash className='w-5 h-5'/>
                )}
                Generate Title
              </button>
            </div>
          </form>

          {/* right col */}
          <div className='w-full bg-white rounded-2xl shadow-soft border border-gray-200 p-6 flex flex-col min-h-[500px]'>
            <div className='flex items-center gap-2 mb-6'>
              <Hash className='w-6 h-6 text-[#8E37EB]' />
              <h1 className='text-xl font-semibold'>Generated Titles</h1>
            </div>
            
            {!content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-center'>
                  <Hash className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                  <p className='text-gray-500 font-medium'>Enter a topic and click 'Generate Title' to get started</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 overflow-y-auto'>
                <div className='prose prose-sm max-w-none text-gray-700'>
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTitles