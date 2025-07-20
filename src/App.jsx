import Home  from './pages/Home';
import Community from './pages/Community';
import  Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import RemoveObj  from './pages/RemoveObj';
import ReviewResume  from './pages/ReviewResume';
import WriteArticle from './pages/WriteArticle';
import BlogTitles from './pages/BlogTitles';
import RemoveBackground from './pages/RemoveBackground';
import GenerateImg from './pages/GenerateImg';
import React from 'react'
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/ai' element={<Layout/>}>
          <Route index element={<Dashboard/>} />
          <Route path='write-article' element={<WriteArticle/>} />
          <Route path='blog-titles' element={<BlogTitles/>} />
          <Route path='remove-background' element={<RemoveBackground/>} />
          <Route path='generate-image' element={<GenerateImg/>} />
          <Route path='remove-object' element={<RemoveObj/>} />
          <Route path='review-resume' element={<ReviewResume/>} />
          <Route path='community' element={<Community/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App