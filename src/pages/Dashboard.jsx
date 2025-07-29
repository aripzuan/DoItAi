import React, { useEffect, useState } from 'react'
import { Gem, Sparkles, TrendingUp, Clock, Zap, Crown, Lock } from 'lucide-react'
import { Protect, useAuth, useUser } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {

  const [creation, setCreation] = useState([])
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalCreations: 0,
    recentActivity: 0,
    freeUsage: 0,
    plan: 'free',
    growthPercentage: 0,
    remainingFreeUsage: 10
  });
  const [isPremium, setIsPremium] = useState(null);

  const {getToken} = useAuth()
  const { user } = useUser()

  const getDashboardData = async () => {
    try {
      // Get user statistics
      const statsResponse = await axios.get('/api/user/get-user-stats', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      });

      if (statsResponse.data.success) {
        setUserStats(statsResponse.data.stats);
      }

      // Get user plan status
      const planResponse = await axios.get('/api/user/get-user-plan', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      });

      if (planResponse.data.success) {
        setIsPremium(planResponse.data.hasPremium);
      }

      // Get user creations
      const creationsResponse = await axios.get('/api/user/get-user-creations', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      });

      if (creationsResponse.data.success) {
        setCreation(creationsResponse.data.creations);
      } else {
        toast.error(creationsResponse.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  useEffect(()=> {
    getDashboardData()
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      getDashboardData()
    }, 30000);

    return () => clearInterval(interval);
  }, [user])

  // Calculate remaining free usage
  const remainingFreeUsage = userStats.remainingFreeUsage || 10 - userStats.freeUsage;
  const isFreeUser = !isPremium;

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
            <h3 className='text-2xl font-bold text-gray-900'>{userStats.totalCreations}</h3>
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
              {isPremium ? 'Premium' : 'Free'}
            </h3>
            <p className='text-xs text-gray-500 mt-1'>
              {isPremium ? 'All features unlocked' : 'Upgrade to unlock more features'}
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
            <h3 className='text-2xl font-bold text-gray-900'>{userStats.recentActivity}</h3>
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
              {isPremium ? '∞' : remainingFreeUsage}
            </h3>
            <p className='text-xs text-gray-500 mt-1'>
              {isPremium ? 'Unlimited usage' : `${remainingFreeUsage} remaining`}
            </p>
          </div>
        </div>
      </div>

      {/* Free User Warning */}
      {isFreeUser && (
        <div className='bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center'>
              <Lock className='w-5 h-5 text-yellow-600' />
            </div>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-yellow-800'>Free Plan Limitations</h3>
              <p className='text-yellow-700 mt-1'>
                You have {remainingFreeUsage} free uses remaining. Upgrade to Premium to unlock unlimited access to all AI tools including image generation, background removal, and resume review.
              </p>
            </div>
            <button className='bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-glow'>
              Upgrade Now
            </button>
          </div>
        </div>
      )}

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
              <CreationItem 
                key={item.id} 
                item={item} 
                onDelete={(deletedId) => {
                  setCreation(prev => prev.filter(item => item.id !== deletedId));
                  // Update stats
                  setUserStats(prev => ({
                    ...prev,
                    totalCreations: prev.totalCreations - 1
                  }));
                }}
              />
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