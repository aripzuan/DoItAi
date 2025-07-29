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
    <div className='h-full overflow-y-scroll p-1 flex items-start flex-wrap gap-2 text-slate-700'>
        {/* left col */}
        <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-2 bg-white rounded-lg border border-gray-200'>
          <div className='flex items-center gap-2'>
            <Sparkles className='w-5 text-[#8E37EB]'/>
            <h1 className='text-lg font-semibold'>AI Title Generator</h1>
          </div>
          <p className='mt-2 text-sm font-medium'>Keyword</p>

          <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-1 outline-none text-sm rounded-md border border-gray-300'placeholder='The future of artificial intelligence is...' required />

          <p className='mt-2 text-sm font-medium'>Category</p>

          <div className='mt-1 flex gap-1 flex-wrap sm:max-w-9/11'>
            {blogCategories.map((item)=> (
              <span onClick={()=> setSelectedCategory(item)} className={`text-xs px-2 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? 'bg-purple-50 text-purple-700' : 'text-gray-500 border-gray-300'}`} key={item}>{item}</span>
            ) )}
          </div>
          
          <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-2 text-sm rounded-lg cursor-pointer'>
            {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Hash className='w-5'/>}    
            Generate Title
          </button>
        </form>
        {/* right col */}
        <div className='w-full max-w-lg p-2 bg-white rounded-lg flex flex-col border border-gray-200 min-h-64'>
            <div className='flex items-center gap-2'>
              <Hash className='w-5 h-5 text-[#8E37EB]' />
              <h1 className='text-lg font-semibold'>Generated Titles</h1>
            </div>
            {
              !content ? (<div className='flex-1 flex justify-center items-center'>
                            <div className='text-sm flex flex-col items-center gap-1 text-gray-400'>
                 <Hash className='w-5 h-5' />
                 <p>Enter a topic and click 'Generate Title' to get started</p>
               </div>
            </div>) : (
              <div className='mt-2 h-full overflow-y-scroll text-sm text-slate-600'>
                <div className='reset-tw'>
                   <Markdown>{content}</Markdown>
                </div>
              </div>
            )
            }
            
        </div>
    </div>
  )
}

export default BlogTitles