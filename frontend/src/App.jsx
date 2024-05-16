
import Navbar from './components/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

import './App.css'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'

function App() {

  return (
    <>

      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route  path='/profile' element={<Profile/>}/>
        <Route  path='/createpost' element={<CreatePost/>}/>
        <Route path='/posts/post/:id' element={<PostDetails/>}/>
      </Routes>
    </>
  )
}

export default App
