import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
        <input type="email" id="email" onChange={handleChange} placeholder='Email' className='border rounded-lg p-3' />
        <input type="password" id="password" onChange={handleChange} placeholder='Password' className='border rounded-lg p-3' />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-3 mt-7 ">
        <p className="font-bold text-red-700">Dont Have an Account?</p>
        <Link to={"/signup"} >
          <span className="text-blue-700 font-semibold">SignUp</span>
        </Link>
      </div>
      {error && <p className="mt-5 text-red-700">{error}</p>}
      
    </div>
  )
}
