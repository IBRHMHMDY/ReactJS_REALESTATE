import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'

import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home /> }/>
        <Route path='/signin' element={<SignIn /> }/>
        <Route path='/signup' element={<SignUp /> }/>
        <Route element={<PrivateRoute/>} >
          <Route path='/profile' element={<Profile /> }/>
        </Route>
        <Route path='/about' element={<About /> }/>
      </Routes>
    </BrowserRouter>
  )
}
