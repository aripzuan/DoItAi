import { Image, Sparkles, Lock, Crown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImg = () => {
  const imageStyle = ['Realistic', 'Ghibli Style', 'Anime Style', 'Cartoon Style', 'Fantasy Style', 'Realistic Style', '3D Style', 'Potrait Style']
    
      const [selectedStyle, setSelectedStyle] = useState('Realistic')
      const [input, setInput] = useState('')
      const [publish, setPublish] = useState(false)
  
      const [loading, setLoading] = useState(false);
      const [content, setContent] = useState('');
      const [isPremium, setIsPremium] = useState(null);
      const [checkingPlan, setCheckingPlan] = useState(true);

      const {getToken} = useAuth();
      const { user } = useUser();

      // Check user's plan status from backend
      useEffect(() => {
        const checkPlan = async () => {
          try {
            const { data } = await axios.get('/api/user/get-user-plan', {
              headers: { Authorization: `Bearer ${await getToken()}` }
            });
            
            if (data.success) {
              setIsPremium(data.hasPremium);
            } else {
              setIsPremium(false);
            }
          } catch (error) {
            console.error('Error checking plan:', error);
            setIsPremium(false);
          } finally {
            setCheckingPlan(false);
          }
        };

        if (user) {
          checkPlan();
        }
      }, [user, getToken]);

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

      // Show loading while checking plan
      if (checkingPlan) {
        return (
          <div className='h-full flex items-center justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent'></div>
          </div>
        );
      }

      // If not premium, show upgrade prompt
      if (!isPremium) {
        return (
          <div className='h-full flex items-center justify-center p-6'>
            <div className='max-w-md w-full bg-white rounded-2xl shadow-soft border border-gray-200 p-8 text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Lock className='w-8 h-8 text-white' />
              </div>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Premium Feature</h2>
              <p className='text-gray-600 mb-6'>
                Image generation is a premium feature. Upgrade to unlock unlimited access to our AI image generator and other advanced tools.
              </p>
              <div className='space-y-3'>
                <div className='flex items-center space-x-3 text-sm text-gray-600'>
                  <Crown className='w-4 h-4 text-yellow-500' />
                  <span>Unlimited image generation</span>
                </div>
                <div className='flex items-center space-x-3 text-sm text-gray-600'>
                  <Crown className='w-4 h-4 text-yellow-500' />
                  <span>Background removal</span>
                </div>
                <div className='flex items-center space-x-3 text-sm text-gray-600'>
                  <Crown className='w-4 h-4 text-yellow-500' />
                  <span>Object removal</span>
                </div>
                <div className='flex items-center space-x-3 text-sm text-gray-600'>
                  <Crown className='w-4 h-4 text-yellow-500' />
                  <span>Resume review</span>
                </div>
              </div>
              <button className='w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-glow mt-6'>
                Upgrade to Premium
              </button>
            </div>
          </div>
        );
      }

  return (
    <div className='h-full overflow-y-auto p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* left col */}
          <form onSubmit={onSubmitHandler} className='w-full bg-white rounded-2xl shadow-soft border border-gray-200 p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <Sparkles className='w-6 h-6 text-[#00AD25]'/>
              <h1 className='text-xl font-semibold'>AI Image Generator</h1>
            </div>
            
            <div className='space-y-6'>
              <div>
                <p className='text-sm font-medium text-gray-700 mb-2'>Describe your image</p>
                <textarea 
                  onChange={(e)=>setInput(e.target.value)} 
                  value={input} 
                  rows={3} 
                  className='w-full p-3 outline-none text-sm rounded-xl border border-gray-300 focus:border-[#00AD25] focus:ring-2 focus:ring-[#00AD25]/20 transition-all resize-none' 
                  placeholder='Describe how you want the image to be...' 
                  required 
                />
              </div>

              <div>
                <p className='text-sm font-medium text-gray-700 mb-3'>Style</p>
                <div className='flex gap-2 flex-wrap'>
                  {imageStyle.map((item)=> (
                    <span 
                      onClick={()=> setSelectedStyle(item)} 
                      className={`text-sm px-4 py-2 border rounded-full cursor-pointer transition-all ${
                        selectedStyle === item 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'text-gray-500 border-gray-300 hover:border-gray-400'
                      }`} 
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <label className='relative cursor-pointer'>
                  <input 
                    type="checkbox" 
                    onChange={(e)=> setPublish(e.target.checked)} 
                    checked={publish} 
                    className='sr-only peer'
                  />
                  <div className='w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all'></div>
                  <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5'></span>
                </label>
                <p className='text-sm text-gray-700'>Make this image public</p>
              </div>

              <button 
                disabled={loading} 
                className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-6 py-3 text-sm rounded-xl font-medium hover:shadow-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? (
                  <span className='w-5 h-5 rounded-full border-2 border-t-transparent animate-spin'></span>
                ) : (
                  <Image className='w-5 h-5'/>
                )}
                Generate Image
              </button>
            </div>
          </form>

          {/* right col */}
          <div className='w-full bg-white rounded-2xl shadow-soft border border-gray-200 p-6 flex flex-col min-h-[500px]'>
            <div className='flex items-center gap-2 mb-6'>
              <Image className='w-6 h-6 text-[#00AD25]' />
              <h1 className='text-xl font-semibold'>Generated Image</h1>
            </div>
            
            {!content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-center'>
                  <Image className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                  <p className='text-gray-500 font-medium'>Enter a topic and click 'Generate Image' to get started</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 flex items-center justify-center'>
                <img src={content} alt="Generated" className='max-w-full max-h-full rounded-lg shadow-medium' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateImg

