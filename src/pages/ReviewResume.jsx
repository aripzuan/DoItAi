import { File, Sparkles, Lock, Crown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
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
    e.preventDefault()
    try{
          setLoading(true);

          const formData = new FormData();
          formData.append('resume', input);

          const {data} = await axios.post('/api/ai/review-resume', formData, {headers: {Authorization: `Bearer ${await getToken()}`}});

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
            Resume review is a premium feature. Upgrade to unlock unlimited access to our AI analysis tools.
          </p>
          <div className='space-y-3'>
            <div className='flex items-center space-x-3 text-sm text-gray-600'>
              <Crown className='w-4 h-4 text-yellow-500' />
              <span>Unlimited resume reviews</span>
            </div>
            <div className='flex items-center space-x-3 text-sm text-gray-600'>
              <Crown className='w-4 h-4 text-yellow-500' />
              <span>Image generation</span>
            </div>
            <div className='flex items-center space-x-3 text-sm text-gray-600'>
              <Crown className='w-4 h-4 text-yellow-500' />
              <span>Background removal</span>
            </div>
            <div className='flex items-center space-x-3 text-sm text-gray-600'>
              <Crown className='w-4 h-4 text-yellow-500' />
              <span>Object removal</span>
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
    <div className='h-full overflow-y-auto p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* left col */}
          <form onSubmit={onSubmitHandler} className='w-full bg-white rounded-2xl shadow-soft border border-gray-200 p-8'>
            <div className='flex items-center gap-3 mb-8'>
              <Sparkles className='w-7 h-7 text-[#00DA83]'/>
              <h1 className='text-2xl font-semibold'>Resume Review</h1>
            </div>
            
            <div className='space-y-8'>
              <div>
                <p className='text-base font-medium text-gray-700 mb-3'>Upload Resume</p>
                <input 
                  onChange={(e)=>setInput(e.target.files[0])} 
                  type="file" 
                  accept='application/pdf' 
                  className='w-full p-4 outline-none text-sm rounded-xl border border-gray-300 text-gray-600 focus:border-[#00DA83] focus:ring-2 focus:ring-[#00DA83]/20 transition-all' 
                  required 
                />
                <p className='text-sm text-gray-500 mt-3'>Supports PDF only.</p>
              </div>

              <button 
                disabled={loading} 
                className='w-full flex justify-center items-center gap-3 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-8 py-4 text-base rounded-xl font-medium hover:shadow-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? (
                  <span className='w-6 h-6 rounded-full border-2 border-t-transparent animate-spin'></span>
                ) : (
                  <File className='w-6 h-6'/>
                )}
                Review Resume
              </button>
            </div>
          </form>

          {/* right col */}
          <div className='w-full bg-white rounded-2xl shadow-soft border border-gray-200 p-8 flex flex-col min-h-[600px]'>
            <div className='flex items-center gap-3 mb-8'>
              <File className='w-7 h-7 text-[#00DA83]' />
              <h1 className='text-2xl font-semibold'>Analysis Result</h1>
            </div>
            
            {!content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-center'>
                  <File className='w-20 h-20 text-gray-300 mx-auto mb-6' />
                  <p className='text-gray-500 font-medium text-lg'>Upload resume and click 'Review Resume' to get started</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 overflow-y-auto'>
                <div className='prose prose-base max-w-none text-gray-700'>
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

export default ReviewResume