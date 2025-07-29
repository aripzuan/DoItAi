import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImg = () => {
  const imageStyle = ['Realistic', 'Ghibli Style', 'Anime Style', 'Cartoon Style', 'Fantasy Style', 'Realistic Style', '3D Style', 'Potrait Style']
    
      const [selectedStyle, setSelectedStyle] = useState('Realistic')
      const [input, setInput] = useState('')
      const [publish, setPublish] = useState(false)
  
      const [loading, setLoading] = useState(false);
      const [content, setContent] = useState('');

      const {getToken} = useAuth();
      const onSubmitHandler = async (e)=> {
        e.preventDefault()
        try{
          setLoading(true);

          const prompt = `Generate an image of ${input} in the style of ${selectedStyle}.`;
          const {data} = await axios.post('/api/ai/generate-image', {prompt, publish}, {headers: {Authorization: `Bearer ${await getToken()}`}});

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
            <Sparkles className='w-5 text-[#00AD25]'/>
            <h1 className='text-lg font-semibold'>AI Image Generator</h1>
          </div>
          <p className='mt-2 text-sm font-medium'>Describe your image</p>

          <textarea onChange={(e)=>setInput(e.target.value)} value={input} rows={2} className='w-full p-2 px-3 mt-1 outline-none text-sm rounded-md border border-gray-300'placeholder='Describe how you want the image to be...' required />

          <p className='mt-2 text-sm font-medium'>Style</p>

          <div className='mt-1 flex gap-1 flex-wrap sm:max-w-9/11'>
            {imageStyle.map((item)=> (
              <span onClick={()=> setSelectedStyle(item)} className={`text-xs px-2 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-green-50 text-green-700' : 'text-gray-500 border-gray-300'}`} key={item}>{item}</span>
            ) )}
          </div>

            <div className='my-2 flex items-center gap-2'>
              <label className='relative cursor-pointer'>
                <input type="checkbox" onChange={(e)=> setPublish(e.target.checked)} checked={publish} className='sr-only peer'/>

                <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
                <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
              </label>
              <p className='text-sm'>Make this image public</p>
            </div>

          <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-2 text-sm rounded-lg cursor-pointer'>
            {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Image className='w-5'/>}
            Generate Image
          </button>
        </form>
        {/* right col */}
        <div className='w-full max-w-lg p-2 bg-white rounded-lg flex flex-col border border-gray-200 min-h-64'>
            <div className='flex items-center gap-2'>
              <Image className='w-5 h-5 text-[#00AD25]' />
              <h1 className='text-lg font-semibold'>Generated Image</h1>
            </div>
            {
              !content ? (<div className='flex-1 flex justify-center items-center'>
                            <div className='text-sm flex flex-col items-center gap-1 text-gray-400'>
                 <Image className='w-5 h-5' />
                 <p>Enter a topic and click 'Generate Image' to get started</p>
               </div>
            </div>) : (
              <div className='mt-2 h-full'>
                <img src={content} alt="image" className='w-full h-full' />
              </div>
            )
            }
            
        </div>
    </div>
  )
}

export default GenerateImg

