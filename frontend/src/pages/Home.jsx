import React from 'react'
import HomePosts from '../components/HomePosts'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
     <Navbar/>

     <HomePosts/>
     <HomePosts/>
     <HomePosts/>
    </div>
  )
}

export default Home
