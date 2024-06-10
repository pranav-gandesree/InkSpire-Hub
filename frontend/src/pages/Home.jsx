import React from 'react'
import HomePosts from '../components/HomePosts'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react'
import { userState } from "../recoil/atoms/userAtom";
import Loader from '../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

const Home = () => {

  const {search}=useLocation()
  
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const user = useRecoilValue(userState);

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get("http://localhost:1111/api/posts/"+search)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)    
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[search])



  return (
    <div>
     <Navbar/>

     <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"} key={post._id}>
          <HomePosts post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
    </div>

    </div>
  )
}

export default Home
