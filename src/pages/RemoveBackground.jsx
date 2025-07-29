import { Eraser, Hash, Sparkles, Lock, Crown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const RemoveBackground = () => {
  const [input, setInput] = useState('')
  
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
    e.preventDefault();
     try{
          setLoading(true);

          const formData = new FormData();
          formData.append('image', input);
          const {data} = await axios.post('/api/ai/remove-background', formData, {headers: {Authorization: `Bearer ${await getToken()}`}});

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
            Background removal is a premium feature. Upgrade to unlock unlimited access to our AI image editing tools.
          </p>
          <div className='space-y-3'>
            <div className='flex items-center space-x-3 text-sm text-gray-600'>
              <Crown className='w-4 h-4 text-yellow-500' />
              <span>Unlimited background removal</span>
            </div>
            <div className='flex items-center space-x-3 text-sm text-gray-600'>
              <Crown className='w-4 h-4 text-yellow-500' />
              <span>Object removal</span>
            </div>
            <div className='flex items-center space-x-3 text-sm text-gray-600'>
              <Crown className='w-4 h-4 text-yellow-500' />
              <span>Image generation</span>
            </div>
            <div className='flex items-center space-x-3 text-sm text-gray-600'>
              <Crown className='w-4 h-4 text-yellow-500' />
              <span>Resume review</span>
            </div>
          </div>
          <button 
            className='w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-glow mt-6'
            onClick={() => window.location.href = '/pricing'}
          >
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
              <Sparkles className='w-6 h-6 text-[#FF4938]'/>
              <h1 className='text-xl font-semibold'>Background Removal</h1>
            </div>
            
            <div className='space-y-6'>
              <div>
                <p className='text-sm font-medium text-gray-700 mb-2'>Upload Image</p>
                <input 
                  onChange={(e)=>setInput(e.target.files[0])} 
                  type="file" 
                  accept='image/*' 
                  className='w-full p-3 outline-none text-sm rounded-xl border border-gray-300 text-gray-600 focus:border-[#FF4938] focus:ring-2 focus:ring-[#FF4938]/20 transition-all' 
                  required 
                />
                <p className='text-xs text-gray-500 mt-2'>Supports JPG, PNG, and other image formats</p>
              </div>

              <button 
                disabled={loading} 
                className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-6 py-3 text-sm rounded-xl font-medium hover:shadow-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? (
                  <span className='w-5 h-5 rounded-full border-2 border-t-transparent animate-spin'></span>
                ) : (
                  <Eraser className='w-5 h-5'/>
                )}
                Remove Background
              </button>
            </div>
          </form>

          {/* right col */}
          <div className='w-full bg-white rounded-2xl shadow-soft border border-gray-200 p-6 flex flex-col min-h-[500px]'>
            <div className='flex items-center gap-2 mb-6'>
              <Eraser className='w-6 h-6 text-[#FF4938]' />
              <h1 className='text-xl font-semibold'>Processed Image</h1>
            </div>

            {!content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-center'>
                  <Eraser className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                  <p className='text-gray-500 font-medium'>Upload image and click 'Remove Background' to get started</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 flex items-center justify-center'>
                <img src={content} alt="Processed" className='max-w-full max-h-full rounded-lg shadow-medium' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground