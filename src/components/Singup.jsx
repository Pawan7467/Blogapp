import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/authslice'
import { Link } from 'react-router'
import Logo from './Logo'
import { useNavigate } from 'react-router'
import {  useForm } from 'react-hook-form'
import { useState } from 'react'
import authservice from '../appwrite/auth'
import Input from './Input'
import Button from './Button'

function Singup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error , seterror] = useState()
    const {register,handleSubmit} = useForm()

    const create =async(data)=>{
      console.log(data)
    seterror("")
    try {
       const userdata = await authservice.createaccount(data) 
       console.log(userdata)
       if(userdata){
        const userdata = await authservice.getcurrentuser()
        if(userdata)
            dispatch(login(userdata));
            navigate("/")
       }
    } catch (error) {
      console.log(error.message)
       seterror(error.message) 
    }
    }
  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className='text-red-600 text-xl'>{error}</p>}
       <form  onSubmit={handleSubmit(create)}>
       <div className='w-full space-y-5'>
         <Input
         label="Full Name:"
         placeholder= "enter your name"
         type="text"
         {...register("name",{
          required:true
         })}
         />
         <Input
         label="email:"
         type="email"
         placeholder="enter your email"
         {...register("email",{
          required:true,
          validate:{
            matchpatern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||"enter valid email"
          }
         })}
         />
         <Input
         type="password"
         label="password"
         placeholder="enter your password"
         {...register("password",{
          required:true
         })}
         />
         
         <Button
         type="submit"
         >Create Account</Button>
        </div>
       </form>
        </div>
        </div>
  )
}

export default Singup