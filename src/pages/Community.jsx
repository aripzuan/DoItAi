import { useAuth, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Heart, Trash2, Eye, EyeOff, MoreVertical } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([])
  const {user} = useUser()
  const [loading, setLoading] = useState(true)
  const {getToken} = useAuth();

  const fetchCreations = async () => {
    try {
      const {data} = await axios.get('/api/user/get-published-creations', {
        headers: {Authorization: `Bearer ${await getToken()}`
      }
    }) 
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id) =>{
    try {
      const {data} = await axios.post('/api/user/like-creation', {id}, {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

        if (data.success) {
          toast.success(data.message);
          await fetchCreations();
        } else {
          toast.error(data.message);
        }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteCreation = async (id) => {
    try {
      const {data} = await axios.delete(`/api/user/delete-creation/${id}`, {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const togglePublish = async (id) => {
    try {
      const {data} = await axios.patch(`/api/user/toggle-publish/${id}`, {}, {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    if(user){
      fetchCreations()
    }
  },[user])

  return !loading ? (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Posts</h1>
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
        {creations.map((creation, index) => (
          <div key={index} className='relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3'>
            <img src={creation.content} alt="" className='w-full h-full object-cover rounded-lg' />
            <div className='absolute bottom-0 to-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
              <p className='text-base font-bold hidden group-hover:block leading-tight'>{creation.prompt}</p>
              <div className='flex gap-2 items-center'>
                {/* Like button */}
                <div className='flex gap-1 items-center'>
                  <p>{creation.likes.length}</p>
                  <Heart onClick={()=> imageLikeToggle(creation.id)} className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'}`} />
                </div>
                
                {/* User actions - only show for user's own posts */}
                {creation.user_id === user.id && (
                  <div className='flex gap-1 items-center'>
                    <button 
                      onClick={() => togglePublish(creation.id)}
                      className='p-1 hover:bg-white/20 rounded transition-colors'
                      title={creation.publish ? 'Unpublish' : 'Publish'}
                    >
                      {creation.publish ? (
                        <EyeOff className='w-4 h-4 text-white' />
                      ) : (
                        <Eye className='w-4 h-4 text-white' />
                      )}
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
                          deleteCreation(creation.id);
                        }
                      }}
                      className='p-1 hover:bg-red-500/20 rounded transition-colors'
                      title='Delete post'
                    >
                      <Trash2 className='w-4 h-4 text-white hover:text-red-300' />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community