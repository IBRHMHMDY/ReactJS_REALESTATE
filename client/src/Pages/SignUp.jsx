import { Link } from "react-router-dom"

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-7'>
        <input type="text" id="username" placeholder='UserName' className='border rounded-lg p-3' />
        <input type="email" id="email" placeholder='Email' className='border rounded-lg p-3' />
        <input type="password" id="password" placeholder='Password' className='border rounded-lg p-3' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>SignUp</button>
      </form>
      <div className="flex gap-3 mt-7 ">
        <p className="font-bold">Have an Account?</p>
        <Link to={"/signin"} >
          <span className="text-blue-700 font-semibold">Signin</span>
        </Link>
      </div>
    </div>
  )
}
