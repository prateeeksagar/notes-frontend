import React from 'react'
import { Link } from 'react-router-dom'

const LoginAndSignupHeader = () => {
  return (
    <div>
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
          <Link to={'/'}><h2 className='text-xl font-medium text-black py-2'>Notes</h2></Link>
          <div className='bg-white flex items-center justify-between gap-4 mr-2'>
            <Link to={'/login'}>
            <button className='btn-primary hover:bg-blue-600 px-4 py-1'>
                Login
            </button>
            </Link>
            <Link to={'/signup'}>
                <button className='border border-black px-4 rounded-lg hover:bg-slate-50 py-[1px]'>
                    Signup
                </button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default LoginAndSignupHeader
