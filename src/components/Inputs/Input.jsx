import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({label, type, value, onChange, placeholder}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="mb-4">
      <label className='text-[13px] text-slate-800'>{label}</label>

      <div className='input-box relative mt-1 border border-slate-300 rounded-md'>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          className='w-full bg-transparent outline-none px-3 py-2 rounded-md [&::-ms-reveal]:hidden [&::-ms-clear]:hidden'   //Hide the password reveal button in Edge and IE using WebkitTextSecurity
          style={{ WebkitTextSecurity: type === 'password' && !showPassword ? 'disc' : 'none' }}
        />

        {type === 'password' && (
          <button 
            type="button"
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-600 hover:text-slate-800 focus:outline-none' 
            onClick={togglePassword}
            tabIndex={-1}
          >
            {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input