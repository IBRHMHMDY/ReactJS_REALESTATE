import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'

import Header from './Components/Header'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home /> }/>
        <Route path='/profile' element={<Profile /> }/>
        <Route path='/signin' element={<SignIn /> }/>
        <Route path='/signup' element={<SignUp /> }/>
        <Route path='/about' element={<About /> }/>
      </Routes>
    </BrowserRouter>
  )
}
