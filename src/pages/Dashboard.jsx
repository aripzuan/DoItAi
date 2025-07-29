import React, { useEffect, useState } from 'react'
import { Gem, Sparkles, TrendingUp, Clock, Zap, Crown } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {

  const [creation, setCreation] = useState([])
  const [loading, setLoading] = useState(true);

  const {getToken} = useAuth()

  const getDashboardData = async () => {
    try {
      const {data} = await axios.get('/api/user/get-user-creations', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      });

      if (data.success) {
        setCreation(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  useEffect(()=> {
    getDashboardData()
  }, [])

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
          <p className='text-gray-600 mt-1'>Welcome back! Here's what's happening with your AI creations.</p>
        </div>
        <div className='flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2'>
          <Sparkles className='w-4 h-4'/>
          <span className='text-sm font-medium'>AI Studio</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Total Creations */}
        <div className='bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center'>
              <Sparkles className='w-6 h-6 text-white' />
            </div>
            <TrendingUp className='w-5 h-5 text-green-500' />
          </div>
          <div>
            <p className='text-sm font-medium text-gray-600 mb-1'>Total Creations</p>
            <h3 className='text-2xl font-bold text-gray-900'>{creation.length}</h3>
            <p className='text-xs text-green-600 mt-1'>+12% from last month</p>
          </div>
        </div>

        {/* Active Plan */}
        <div className='bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center'>
              <Crown className='w-6 h-6 text-white' />
            </div>
            <Gem className='w-5 h-5 text-yellow-500' />
          </div>
          <div>
            <p className='text-sm font-medium text-gray-600 mb-1'>Active Plan</p>
            <h3 className='text-2xl font-bold text-gray-900'>
              <Protect plan='premium' fallback="Free">Premium</Protect>
            </h3>
            <p className='text-xs text-gray-500 mt-1'>
              <Protect plan='premium' fallback="Upgrade to unlock more features">All features unlocked</Protect>
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className='bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center'>
              <Clock className='w-6 h-6 text-white' />
            </div>
            <Zap className='w-5 h-5 text-purple-500' />
          </div>
          <div>
            <p className='text-sm font-medium text-gray-600 mb-1'>Recent Activity</p>
            <h3 className='text-2xl font-bold text-gray-900'>{creation.slice(0, 3).length}</h3>
            <p className='text-xs text-gray-500 mt-1'>Last 24 hours</p>
          </div>
        </div>

        {/* AI Credits */}
        <div className='bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center'>
              <Zap className='w-6 h-6 text-white' />
            </div>
            <Sparkles className='w-5 h-5 text-green-500' />
          </div>
          <div>
            <p className='text-sm font-medium text-gray-600 mb-1'>AI Credits</p>
            <h3 className='text-2xl font-bold text-gray-900'>
              <Protect plan='premium' fallback="50">∞</Protect>
            </h3>
            <p className='text-xs text-gray-500 mt-1'>
              <Protect plan='premium' fallback="Limited credits">Unlimited usage</Protect>
            </p>
          </div>
        </div>
      </div>

              {/* Recent Creations */}
        <div className='bg-white rounded-2xl shadow-soft border border-gray-100 p-6'>
            <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-bold text-gray-900'>Recent Creations</h2>
          <button className='text-primary hover:text-primary-dark font-medium text-sm transition-colors duration-200'>
            View All
          </button>
        </div>
        
        {loading ? (
          <div className='flex justify-center items-center py-8'>
            <div className='animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent'></div>
          </div>
        ) : creation.length > 0 ? (
          <div className='space-y-3'>
            {creation.map((item) => (
              <CreationItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className='text-center py-8'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Sparkles className='w-8 h-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No creations yet</h3>
            <p className='text-gray-600 mb-6'>Start creating amazing content with our AI tools!</p>
            <button className='bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-glow'>
              Start Creating
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard