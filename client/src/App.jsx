import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Auth from './components/Auth.jsx'
import Profile from './components/Profile.jsx'
import Public from './components/Public.jsx'
import { UserContext } from './context/UserProvider.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'


function App() {
  const { token, logout } = useContext(UserContext)

  return (
    <div className='app'>
        {token && <Navbar logout={logout}/>}
        <Routes>
          <Route 
            path='/' 
            element={token ? <Navigate to='/profile' /> : <Auth/>} />
          <Route 
            path='/profile' 
            element={<ProtectedRoutes token={token} redirect='/'>
              <Profile/>
            </ProtectedRoutes>}/>
          <Route 
            path='/public' 
            element={<ProtectedRoutes token={token} redirect='/'>
              <Public/>
            </ProtectedRoutes>}/>
        </Routes>
    </div>
  )
}

// Encrypt passwords
// ErrMsg 
// Routing

export default App
