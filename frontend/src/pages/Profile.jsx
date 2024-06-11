import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from 'recoil';
import { userState } from "../recoil/atoms/userAtom";

const Profile = () => {
  const param=useParams().id
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [user, setUser] = useRecoilState(userState);
  const navigate=useNavigate()
  const [posts,setPosts]=useState([])
  const [updated,setUpdated]=useState(false)
  // console.log(user)

const fetchProfile=async ()=>{
  try{
     const res=await axios.get("http:localhost:1111/api/users/"+user._id)
     setUsername(res.data.username)
     setEmail(res.data.email)
     setPassword(res.data.password)
  }
  catch(err){
     console.log(err)
  }
}

const handleUserUpdate=async ()=>{
  setUpdated(false)
  try{
    const res=await axios.put("http:localhost:1111/api/users/"+user._id,{username,email,password},{withCredentials:true})
    // console.log(res.data)
    setUpdated(true)

  }
  catch(err){
    console.log(err)
    setUpdated(false)
  }

}

const handleUserDelete=async()=>{
  try{
    const res=await axios.delete("http:localhost:1111/api/users/"+user._id,{withCredentials:true})
    setUser(null)
    navigate("/")
    // console.log(res.data)

  }
  catch(err){
    console.log(err)
  }
}

const fetchUserPosts = async () => {
  try {
    if (!user || !user._id) {
      console.log("User not logged in or invalid user data.");
      return;
    }
    const res = await axios.get(`http://localhost:1111/api/posts/user/${user._id}`); 
    setPosts(res.data.userPosts);
    // console.log("postss,", res.data.userPosts)
  } catch (err) {
    console.log("Error fetching user posts:", err.response ? err.response.data : err.message);
    setPosts([]);
  }
};



useEffect(()=>{
  fetchProfile()
},[param])


useEffect(() => {
  fetchUserPosts();
}, [param]);


return (
  <div>
    <Navbar/>
    <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
      <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
        <h1 className="text-xl font-bold mb-4">Your posts:</h1>
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <ProfilePosts key={post._id} post={post}/>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
      <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
        <div className="flex flex-col space-y-4 items-start">
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <p className="text-gray-500">{username}</p>
          <p>{email}</p>
        </div>
      </div>
    </div>
  </div>
);

}

export default Profile